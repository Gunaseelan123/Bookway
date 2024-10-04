class Note{
    constructor(title,author,isbn){
        this.titlename=title;
        this.authorname=author;
        this.isbnnum=isbn;
    }
}



class Con2{
    funname(write){
        var tb=document.querySelector("#book-list")
        var tr=document.createElement("tr")
        tr.innerHTML=`<td>${write.titlename}</td>
                    <td>${write.authorname}</td>
                    <td class="des">${write.isbnnum}</td>
                    <td class="delete">
                        <a href="#" class="btn btn-danger">X</a>
                    </td>
                    <td class="edit"">
                        <a href="#" class="btn btn-success">Edit</a>
                    </td>`
        tb.appendChild(tr)
        
    }
    



    //to empty
    inempty(){
        document.querySelector("#title").value="";
        document.querySelector("#author").value="";
        document.querySelector("#isbn").value="";
    }



    //to clearall
    clearall(){
        document.querySelector("#book-list").innerHTML="";
    }




    //on click delete single item
    delete(item){
        item.remove()
    }




    //alert
    alert(message,type){
        this.ddl();


        var a=document.createElement("div");
        a.innerText=message;
        a.className=`alert alert-${type}`
        var t=document.querySelector("#show-alert")
        t.appendChild(a);

        setTimeout(() => {
            document.querySelector(".alert").remove();
            this.ddl();
        }, 2000);
    }


    //to remove previous alert
    ddl(){
        var b=document.querySelector(".alert")
        if(b){
            b.remove()
        }
    }


    
}





//local storage

class Ls{
    //to create and store ls
    local(write){
        var arr;
        if(localStorage.getItem("book")===null){
            arr=[];
            arr.push(write);
            localStorage.setItem("book",JSON.stringify(arr));
        }
        else{
            var arr=JSON.parse(localStorage.getItem("book"));
            arr.push(write)
            localStorage.setItem("book",JSON.stringify(arr));
        }
        
    }

    //content loaded
    loaded(){
        if(localStorage.getItem("book")===null){
            var r;
            r=[];
        }
        else{
            var t=JSON.parse(localStorage.getItem("book"))
            t.forEach(function(item){
                var ins=new Con2();
                ins.funname(item)
                
                // var tb=document.querySelector("#book-list")
                // var tr=document.createElement("tr")
                // tr.innerHTML=`<td>${item.titlename}</td>
                //     <td>${item.authorname}</td>
                //     <td class="des">${item.isbnnum}</td>
                //     <td class="delete">
                //         <a href="#" class="btn btn-danger">X</a>
                //     </td>`
                // tb.appendChild(tr)
            })
        }
    }

    
    //to clear all ls
    clearlocal(){
        localStorage.removeItem("book")
    }


    
    //to delete single value in ls
    singledelete(k){
        var delvalue =k.parentElement.previousElementSibling.innerText;
        var l=JSON.parse(localStorage.getItem("book"))
        l.forEach(function(item,ind){
            if(item.isbnnum===delvalue){
                l.splice(ind,1)
            }
        })
        localStorage.setItem("book",JSON.stringify(l))
    }
}






//all event listeners start


//submit
var formsubmit=document.querySelector("#book-form");
formsubmit.addEventListener("submit",onsubmit)
function onsubmit(e){
    
    e.preventDefault()

    var tit=document.querySelector("#title").value;
    var auth=document.querySelector("#author").value;
    var numb=document.querySelector("#isbn").value;


    var inscon2=new Con2();
    var ls=new Ls()

    

    

    if(tit==""||auth==""||numb==""){
        
        inscon2.alert("enter all value","danger")
        
    }

    else{
        const tr=document.querySelectorAll("#book-list tr");
        let bookexist=false;
        for(const bookrow of tr){
            const extitle=bookrow.querySelector("td:nth-child(1)").innerText;
            const exisbn=bookrow.querySelector("td:nth-child(3)").innerText;
            if(extitle===tit || exisbn===numb){
                bookexist=true
                break;
            }
        }


        if(bookexist){
            document.querySelector("#isbn").value="";
            inscon2.alert("value repeated","danger");
        }


    
        else{
            var write=new Note(tit,auth,numb);
            inscon2.funname(write)
            ls.local(write)//local storage
            inscon2.inempty()
            inscon2.alert("success","success");
        }
    }

    
        
        
    
}




//clear all
document.querySelector("#clear").addEventListener("click",function(){
    var inscon2=new Con2();
    inscon2.clearall()
    inscon2.alert("all are cleared","success")
    var ls=new Ls()
    ls.clearlocal()
    
})

let row;

//delete single item
document.querySelector("#book-list").addEventListener("click",function(e){
    var inscon2=new Con2();
    if(e.target && e.target.parentElement.classList.contains("delete")){
        inscon2.delete(e.target.parentElement.parentElement)
        inscon2.alert("that item is cleared","success")
        var ls=new Ls()
        ls.singledelete(e.target)
        console.log(e.target.parentElement)
    }


    if(e.target && e.target.parentElement.classList.contains("edit")){
       document.getElementById("test").classList.add("d-none")
       document.getElementById("update").classList.remove("d-none")
       document.getElementById("update").classList.add("d-block")

       
       row=e.target.parentElement.parentElement
       var t=row.cells[0].innerText;
       var a=row.cells[1].innerText;
       var i=row.cells[2].innerText;
       var tit=document.querySelector("#title").value=t;
       var auth=document.querySelector("#author").value=a;
       var numb=document.querySelector("#isbn").value=i;
       


    }

})




document.getElementById("update").addEventListener("click",function(){

    var tit=document.querySelector("#title").value;
    var auth=document.querySelector("#author").value;
    var numb=document.querySelector("#isbn").value;
    var t=row.cells[0].innerText=tit;
    var a=row.cells[1].innerText=auth;
    var i=row.cells[2].innerText=numb;


    console.log("row",row)
    var inscon2=new Con2();
    inscon2.alert("that item is updated","success")
    inscon2.inempty()
    document.getElementById("update").classList.add("d-none")
    document.getElementById("test").classList.remove("d-none")
    document.getElementById("test").classList.add("d-block")
})
















//contentloaded
document.addEventListener("DOMContentLoaded",function(){
    var ls=new Ls();
    ls.loaded();
})


// document.addEventListener("DOMContentLoaded",function(){
//     console.log(document.querySelectorAll(".edit"))
// })


// document.onreadystatechange = () => {
//     if (document.readyState === "complete") {
        
//     }
//   };


