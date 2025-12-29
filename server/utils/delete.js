exports.getPublicId = (url) => {
   return url.split("/").pop().split(".")[0]
}