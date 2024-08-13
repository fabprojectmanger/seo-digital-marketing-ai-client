import Link from "next/link";
import React from "react";
import IconLike from '../../../public/icons/IconLike'
const BlogsComponent = ({ props }) => {  
  return (
    <div className="mx-auto p-6">
      <div className="lg:max-h-[300px] h-full flex flex-col flex-col-reverse md:flex-row bg-white rounded-lg shadow-lg md:items-center justify-center">
      <div className="md:w-[80%] p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
           {props.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {props.shortDescription}
          </p>
          <Link href={{pathname:`/blogs/${props.slug}`,query:{id:props.sys.id}}} className="text-blue-600 hover:underline font-bold">
            READ MORE
          </Link>
          <div className="flex items-center mt-6">
            <div className="text-sm">
              <p className="text-gray-600">{new Date(props.date).toISOString()}</p>
            </div>
          </div>
        </div>
        <div className="md:w-[20%] md:p-4 md:h-[150px] lg:h-[200px] flex items-center justify-center">
          <img
            className="object-contian w-full h-full"
            src={props.image.url}
            alt="City Street"
          />
        </div>
        
      </div>
    </div>
  );
};
export default BlogsComponent;

