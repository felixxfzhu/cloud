/**
 * Created by dell on 2019/4/21.
 */
const Paths = {
    host:"http://ec2-13-125-68-233.ap-northeast-2.compute.amazonaws.com:8888/api/v1",
    login:"/login",
    products:"/loadProducts",
    detail:"/loadProductDetail",
    presonalInfo:"PresonalInfo/index"
}
if(process.env.NODE_ENV == "production"){
    Paths["host"] = "https://www.production.cn"
    console.log("production");
}else if(process.env.NODE_ENV == "development"){
    Paths["host"] = "http://ec2-13-125-68-233.ap-northeast-2.compute.amazonaws.com:8888/api/v1"
    console.log("development");
}else {
    console.log("testing")
    Paths["host"] = "https://www.testing.cn"
}

export default Paths;