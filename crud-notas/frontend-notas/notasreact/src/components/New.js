import React, {useState} from "react";
import Global from "../Global";
import axios from "axios"
import {Navigate} from "react-router-dom"

const New = () => {

    const url = Global.url;

    const [article, setArticle] = useState({
        //We write default data
        title: null, 
        content: null,
        author: null,
    });

    const [redirect, setRedirect] = useState(false)

    //Form Data reference
let titleRef = React.createRef();
let contentRef = React.createRef();
let authorRef = React.createRef();

const changeState = () => {
    setArticle({
        title: titleRef.current.value,
        content: contentRef.current.value,
        author: authorRef.current.value
    })
    console.log(article);
}

const sendData = (e) => {
    //Avoid web refresh when receiving data
    e.preventDefault();
    changeState();
    //Http Request via post, it saves new article
    axios.post(url + "save", article).then(res => {
        console.log(res.data);
        setRedirect(true)
    })

    if(redirect) {
        return <Navigate to="articles"/>
    }

}


    return (
        <div className="nueva-publicacion">

            <div id="formulario" className="card mx-auto mb-3 mt-5" style={{width: "30em"}}>

                <div className="card-header text-dark ">

                    <h4> Publish a new article </h4>
                </div>

                <div className="card-body">
                
                    <form onSubmit={sendData}>
                    
                        <div className="mb-3">
                            <label> Title </label>
                            <input type="text" className="form-control" ref={titleRef} onChange={changeState} id="title" name="title" required/>
                        </div>

                        <div className="mb-3">
                            <label> Content </label>
                            <textarea className="form-control" ref={contentRef} onChange={changeState} id="title" name="content" rows="6" cols="30" required/>
                        </div>

                        <div className="mb-3">
                            <label> Author </label>
                            <input type="text" className="form-control"  ref={authorRef} onChange={changeState} id="title" name="title" required/>
                        </div>

                        <div className="mb-3">
                            <input className="form-control btn btn-primary" type="submit" id="publish" value="Publicar" />
                        </div>
                    </form>
                </div>
            
            </div>
        </div>
    )
}

export default New;