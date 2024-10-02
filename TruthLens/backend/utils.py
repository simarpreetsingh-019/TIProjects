import re
import cv2
import math
import base64
import random
import string

import requests
import yt_dlp
import hashlib

image_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp']
video_extensions = ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'm4v']


def invoke_uid(length=10, alphanumeric=True):
    char_pool = string.ascii_lowercase + string.ascii_uppercase if alphanumeric else string.digits
    uid = "".join(random.choices(char_pool, k=length))
    return uid


def get_file(file_path):
    with open(file_path, "rb") as file:
        file = file.read()
        return file


def file_to_base64(file_path):
    file_content = get_file(file_path)
    base64_encoded = base64.b64encode(file_content)
    base64_string = base64_encoded.decode('utf-8')
    return base64_string


def sha256(string):
    return hashlib.sha256(string.encode()).hexdigest()


def file_to_sha256(fid):
    return sha256(file_to_base64(fid))


def get_four_screenshots(video_path):
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_indices = [math.floor(i * total_frames / 9) for i in range(1, 9)]
    screenshots = []
    for idx in frame_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if ret:
            screenshots.append(frame)
    cap.release()
    return screenshots


def is_youtube_url(url):
    regex = r"you|yt"
    return re.search(regex, url)


def is_twitter_url(url):
    return "twitter.com" in url or "x.com" in url


def is_instagram_url(url):
    base_urls = ["https://www.instagram.com", "http://www.instagram.com", "https://instagram.com"]
    return any(url.startswith(base) for base in base_urls)


def yt_downloader(url, file_uid):
    ydl_opts = {
        'format': 'bestvideo[height<=360][ext=mp4]+bestaudio[ext=m4a]/best[height<=360][ext=mp4]/best[height<=360]',
        'outtmpl': f'assets/{file_uid}',
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


def insta_downloader():
    res = requests.post('https://fastdl.app/api/convert', json={
        "url": "https://www.instagram.com/reel/C8zaus6s8Qs",
    })
    print(res)
    
def extract_video_info(url):
    ydl_opts = {
        'format': 'best',
        'noplaylist': True,
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            uid = info.get('id', 'Unknown ID')
            channel = info.get('channel', 'Unknown Channel')
            title = info.get('title', 'Unknown Title')
        return {'channel': channel, 'title': title, 'id': uid}
    except Exception as e:
        print(f"Error extracting video info: {e}")
        return {'channel': 'Unknown Channel', 'title': 'Unknown Title'}