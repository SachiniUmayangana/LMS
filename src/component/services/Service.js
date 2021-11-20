import React, {useEffect} from 'react'

export default function Service() {

    const [posts,setPosts]=useState([])
    useEffect(()=>{
      const url='https://jsonplaceholder.typicode.com/posts';//api url
      fetch(url).then(resp=>resp.json())//calling url by method GET
      .then(resp=>setPosts(resp))//setting response to state posts
    },[])

    return (
        <div>
            
        </div>
    )
}
