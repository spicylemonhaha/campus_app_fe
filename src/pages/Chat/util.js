export const transMsg = (item) => {
  const msg = item.message
  const isURLImg = (value) => /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(value)
  if (msg) {
    if (isURLImg(msg)) {
      return `<text>${msg}</text>` + `<image src=${msg} width="120" />`
    }
  }
  if (item.fileName) {
    return `<a href="${item.fileDownloadUrl}">${item.fileName}</a>`
  }
  return msg
}
export const scroll2bottom = () => {
  const dom = document.body.getElementsByClassName('chat-warp')[0]
  dom && dom.scrollTo(0, 1000000)
}
