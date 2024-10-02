import cv2
import torch
import warnings
from PIL import Image
import torch.nn.functional as F
from fastapi import HTTPException
from pytorch_grad_cam import GradCAM
from facenet_pytorch import MTCNN, InceptionResnetV1
from pytorch_grad_cam.utils.image import show_cam_on_image
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget

warnings.filterwarnings("ignore")

DEVICE = 'cuda:0' if torch.cuda.is_available() else 'cpu'

mtcnn = MTCNN(
    select_largest=False,
    post_process=False,
    device=DEVICE
).to(DEVICE).eval()

model = InceptionResnetV1(
    pretrained="vggface2",
    classify=True,
    num_classes=1,
    device=DEVICE
)


def get_confidences(face):
    with torch.no_grad():
        result = torch.sigmoid(model(face).squeeze(0))
        prediction = "real" if result.item() < 0.5 else "fake"
        return {
            'real': 1 - result.item(),
            'fake': result.item(),
            'prediction': prediction
        }


def unmask_image(input_image: Image.Image):
    """Predict the label of the input_image"""
    face_found = mtcnn(input_image)
    if face_found is None:
        raise HTTPException(status_code=400, detail='No face detected')
    face_found = face_found.unsqueeze(0)  # add the batch dimension
    face_found = F.interpolate(face_found, size=(256, 256), mode='bilinear', align_corners=False)

    # convert the face into a numpy array to be able to plot it
    prev_face = face_found.squeeze(0).permute(1, 2, 0).cpu().detach().int().numpy()
    prev_face = prev_face.astype('uint8')

    face_found = face_found.to(DEVICE).to(torch.float32)
    face_found = face_found / 255.0
    face_image_to_plot = face_found.squeeze(0).permute(1, 2, 0).cpu().detach().int().numpy()

    target_layers = [model.block8.branch1[-1]]
    use_cuda = True if torch.cuda.is_available() else False
    cam = GradCAM(model=model, target_layers=target_layers, use_cuda=use_cuda)
    targets = [ClassifierOutputTarget(0)]

    grayscale_cam = cam(input_tensor=face_found, targets=targets, eigen_smooth=True)
    grayscale_cam = grayscale_cam[0, :]
    visualization = show_cam_on_image(face_image_to_plot, grayscale_cam, use_rgb=True)
    face_with_mask = cv2.addWeighted(prev_face, 1, visualization, 0.5, 0)
    prediction = get_confidences(face_found)
    return prediction
