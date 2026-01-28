
const http = require("http")
const uuid = require("uuid")
const { read_file, write_file } = require("./api/file-system")
const { writeFile } = require("fs")
const { stringify } = require("querystring")

//crud

const options= {"Content-Type": "application/json","Access-Control-Origin":"*"}
const app = http.createServer((req, res) => {
    const reqId= req.url.split("/").pop()
    console.log(reqId);
    

    //get

    if(req.url === "/get_all_products" && req.method === "GET"){
        const fileData = read_file("product.json")
        
        res.writeHead(200, options)
        res.end(JSON.stringify(fileData))

    }
                  //hospital
    if(req.url === "/get_all_hospitals" && req.method === "GET"){
        const hospitalData = read_file("hospital.json")
        
        res.writeHead(200, options)
        res.end(JSON.stringify(hospitalData))

    }
                  //student
    if(req.url === "/get_all_students" && req.method === "GET"){
        const studentData = read_file("student.json")
        
        res.writeHead(200, options)
        res.end(JSON.stringify(studentData))

    }
    //get_one

    if (req.url === `/get_one_product/${reqId}` && req.method === "GET") {
         const fileData = read_file("product.json")

         const foundedProduct = fileData.find((item) => item.id === reqId)

         if (!foundedProduct) {
            res.writeHead(404, options)
           return res.end(JSON.stringify({
                message: "Product not found"
            }))
            
         }

         res.writeHead(200,options)
         res.end(JSON.stringify(foundedProduct))
        
    }
                         //hospital
    if (req.url === `/get_one_hospital/${reqId}` && req.method === "GET") {
         const fileData = read_file("hospital.json")

         
         const foundedHospital = fileData.find((item) => item.id === reqId)

          if (!foundedHospital) {
            res.writeHead(404, options)
           return res.end(JSON.stringify({
                message: "Hospital not found"
            }))
            
         }

         res.writeHead(200,options)
         res.end(JSON.stringify(foundedHospital))
        
    }
                         //student
    if (req.url === `/get_one_student/${reqId}` && req.method === "GET") {
         const fileData = read_file("student.json")

         
         const foundedStudent = fileData.find((item) => item.id === reqId)

          if (!foundedStudent) {
            res.writeHead(404, options)
           return res.end(JSON.stringify({
                message: "Student not found"
            }))
            
         }

         res.writeHead(200,options)
         res.end(JSON.stringify(foundedStudent))
        
    }



    //post

    if(req.url === "/add_product" && req.method === "POST"){
        req.on("data", (userData) =>{
            const data = JSON.parse(userData)
            const {title, desc} = data
            const fileData = read_file("product.json")

            fileData.push({
                id: uuid.v4(),
                title,
                desc

            })

            write_file("product.json",fileData)

            res.writeHead(201,options)
            res.end(JSON.stringify({
                message: "Created"
            }))
        })
    }
                           ///hospital

    if(req.url === "/add_hospital" && req.method === "POST"){
        req.on("data", (userData) =>{
            const data = JSON.parse(userData)
            const {name, address,phone} = data
            const fileData = read_file("hospital.json")

            fileData.push({
                id: uuid.v4(),
                name,
                address,
                phone

            })

            write_file("hospital.json",fileData)

            res.writeHead(201,options)
            res.end(JSON.stringify({
                message: "Hospital Created"
            }))
        })
    }
                       ///student

    if(req.url === "/add_student" && req.method === "POST"){
        req.on("data", (userData) =>{
            const data = JSON.parse(userData)
            const {name, group} = data
            const fileData = read_file("student.json")

            fileData.push({
                id: uuid.v4(),
                name,
                group

            })

            write_file("student.json",fileData)

            res.writeHead(201,options)
            res.end(JSON.stringify({
                message: "Student Created"
            }))
        })
    }



    //update

    if (req.url === "/update_product"+ reqId && req.method=== "PUT" ) {
        req.on("data",(chunk) =>{
            const data = JSON.parse(chunk)

            const {title, desc} = data

            const fileData = read_file("product.json")

            const foundedProduct = fileData.find((item) => item.id === reqId)

            if (!foundedProduct) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                    message : "product not found"
                }))
            }

            fileData.forEach((item) =>{
                if (item.id===reqId) {
                    item.title= title ? title : item.title
                    item.desc= desc ? desc : item.desc
                }
            })

            res.writeHead(200,options)
            write_file("product.json",fileData)
            res.end(JSON.stringify({
                message : "successful"
            }))


        })
        
    }


                   ////hospital

    if (req.url === "/update_hospital"+ reqId && req.method=== "PUT" ) {
        req.on("data",(chunk) =>{
            const data = JSON.parse(chunk)

            const {name, address,phone} = data

            const fileData = read_file("hospital.json")

            const foundedHospital = fileData.find((item) => item.id === reqId)

            if (!foundedHospital) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                    message : "hospital not found"
                }))
            }

            fileData.forEach((item) =>{
                if (item.id===reqId) {
                    item.name= name ? name : item.name
                    item.address= address ? address : item.address
                    item.phone= phone ? phone : item.phone
                }
            })

            res.writeHead(200,options)
            write_file("hospital.json",fileData)
            res.end(JSON.stringify({
                message : "successful"
            }))


        })
        
    }



                      ///student



    if (req.url === "/update_student"+ reqId && req.method=== "PUT" ) {
        req.on("data",(chunk) =>{
            const data = JSON.parse(chunk)

            const {name, group} = data

            const fileData = read_file("student.json")

            const foundedStudent = fileData.find((item) => item.id === reqId)

            if (!foundedStudent) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                    message : "student not found"
                }))
            }

            fileData.forEach((item) =>{
                if (item.id===reqId) {
                    item.name= name ? name : item.name
                    item.group= group ? group : item.group
                }
            })

            res.writeHead(200,options)
            write_file("student.json",fileData)
            res.end(JSON.stringify({
                message : "successful"
            }))


        })
        
    }


    //delete


    if (req.url === "/delete_product"+reqId && req.method === "DELETE") {

        const fileData = read_file("product.json")

         const foundedProduct = fileData.find((item) => item.id === reqId)

            if (!foundedProduct) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                    message : "product not found"
                }))
            }

           fileData.forEach((item, idx) =>{
                if (item.id===reqId) {
                    fileData.splice(idx, 1)
                }
            })

            res.writeHead(200,options)
            write_file("product.json",fileData)
            res.end(JSON.stringify({
                message : "deleted"
            }))
            
    }

               ////hospital

    if (req.url === "/delete_hospital"+reqId && req.method === "DELETE") {

        const fileData = read_file("hospital.json")

         const foundedHospital = fileData.find((item) => item.id === reqId)

            if (!foundedHospital) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                    message : "hospital not found"
                }))
            }

           fileData.forEach((item, idx) =>{
                if (item.id===reqId) {
                    fileData.splice(idx, 1)
                }
            })

            res.writeHead(200,options)
            write_file("hospital.json",fileData)
            res.end(JSON.stringify({
                message : "deleted"
            }))
            
    }



                   ///student


    if (req.url === "/delete_student"+reqId && req.method === "DELETE") {
        const fileData = read_file("student.json")

         const foundedStudent = fileData.find((item) => item.id === reqId)

            if (!foundedStudent) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                    message : "student not found"
                }))
            }

           fileData.forEach((item, idx) =>{
                if (item.id===reqId) {
                    fileData.splice(idx, 1)
                }
            })

            res.writeHead(200,options)
            write_file("student.json",fileData)
            res.end(JSON.stringify({
                message : "deleted"
            }))
            
    }

    












})

app.listen(3000, () =>{
    console.log("server is running");
    
})