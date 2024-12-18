// export function useSpliceLinkText(text: File | null | string, target: string) {
//   const result = String(text).substring(
//     String(text).indexOf(target) + target.length,
//     9999
//   );

//   return result;
// }

export function useSpliceLinkText(url: string) {
  const index = url.lastIndexOf("/"); // 마지막 '/' 위치 찾기
  if (index === -1) return url; // '/'가 없으면 원본 리턴
  return url.substring(index + 1); // 마지막 '/' 이후 부분 리턴
}
