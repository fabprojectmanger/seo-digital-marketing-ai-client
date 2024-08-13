"use client";
import React, { useEffect, useState } from "react";
import ComingSoon from "../../sections/coming-soon/coming-soon";
import Wrapper from "../../components/wrapper/wrapper";
import Container from "../../components/container/container";
import BlogsComponent from "./blogsComponent";
import axios from "axios";
import {All_BLOGS_QUERY} from './data'
const page = () => {
  // const [allBlogs, setBlogData] = useState([]);
  // async function fetchGraphQL(query) {
  //   const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`; // Replace with your API endpoint
  //   const headers = {
  //     "Content-Type": "application/json", 
  //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`, 
  //   };

  //   const data = { query };
  //   try {
  //     const response = await axios.post(url, data, { headers: headers });
  //     console.log("ResponseData:", response.data);
  //     if(response.data){
  //       setBlogData(response.data.data.blogsCollection.items)
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Response Error:", error.response.data);
  //     }
  //     console.error("Config:", error.config);
  //   }
  // }
  // useEffect(() => {
  //   fetchGraphQL(All_BLOGS_QUERY);
  // }, []);

  return (
    // <Wrapper>
    //   <Wrapper className="mb-10 mt-16 max-sm-tab:mt-0">
    //     <Container className="items-center flex justify-center">
    //       <Wrapper className="">
    //         <div className="max-w-[70%] mx-auto w-full">
    //         {allBlogs.map((item)=>(
    //           <div className='gap-5 mb-10 mt-16 bg-white'>
    //             <BlogsComponent key={item._id} props={item}/>
    //           </div>
    //         ))}
    //           </div>

    //       </Wrapper>
    //     </Container>
    //   </Wrapper>
    // </Wrapper>
    <ComingSoon />
  );
};

export default page;
