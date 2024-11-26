import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600, // 리사이징 적용할 최대 넓이
      600, // 리사이징 적용할 최대 높이
      "JPEG", // 리사이징 이미지 포맷
      100, // 리사이징 품질
      0, // 이미지 회전 정도
      (uri) => {
        resolve(uri); // 리사이징 된 이미지 URI
      },
      "base64" // 출력 타입
    );
  });
