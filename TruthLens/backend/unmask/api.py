import os
import cv2
from PIL import Image
from fastapi import APIRouter, HTTPException
from unmask.unmasker import unmask_image
from utils import image_extensions, file_to_sha256, video_extensions, get_four_screenshots, invoke_uid

unmask_router = APIRouter(tags=['unmask'])


@unmask_router.get('/unmask/{client_address:str}/{file_uid:str}')
async def unmasker(client_address: str, file_uid: str):
    path = f'assets/{file_uid}'

    print(path)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail='File not found')

    if file_uid.split('.')[-1].lower() in image_extensions:
        ftype = 'image'
    elif file_uid.split('.')[-1].lower() in video_extensions:
        ftype = 'video'
    else:
        return HTTPException(402, 'filetype error')
    if ftype == 'video':
        return {'status': 'pending', 'type': ftype}

    file = Image.open(f"assets/{file_uid}")
    prediction = unmask_image(file)
    res = {'prediction': prediction,
           'status': 'finish',
           'type': ftype,
           'fid': file_uid,
           'hash': file_to_sha256(f'assets/{file_uid}')}
    return res


@unmask_router.get("/split_vid")
async def upload_file(fid: str):
    print('spliting video')
    path = f'assets/{fid}'
    if not os.path.exists(path):
        return False
    snaps = get_four_screenshots(path)
    snap_ids = []
    for i, screenshot in enumerate(snaps):
        fid = invoke_uid()
        snap_ids.append(f'{fid}.png')
        cv2.imwrite(f"assets/{fid}.png", screenshot)
    return {"snap": snap_ids}
