import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {SquarePen, Trash} from "lucide-react";

const BlogTableItem = ({authorImg,title,author,date,confirmDeleteBlog,mongoId}) => {
    const BlogDate = new Date(date);
    return (
        <tr className='bg-white border-b'>
          <td scope='row' className='items-center gap-3 flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap mr-4'>
            <Image width={40} height={40} src={authorImg?authorImg:"No author image"} alt=''className='rounded-full w-11 h-11 '/>
            <p>{author?author:"No author"}</p>

          </td>
            <td className='px-6 py-4 text-gray-900'>
                {title?title:"No title"}

            </td>
            <td className='px-6 py-4 text-gray-900'>
                {BlogDate.toDateString()}

            </td>
            <td  className='pl-6 py-4 cursor-pointer text-gray-900'>
               <Link href={`/admin/updateProduct/${mongoId}`}> <button title='Edit' className='cursor-pointer '><SquarePen /></button></Link>

            </td>
            <td onClick={()=>confirmDeleteBlog(mongoId)} className='pr-8 py-4 cursor-pointer text-gray-900 hover:text-red-500'>
                <button title='Delete' className='cursor-pointer '><Trash /></button> 

            </td>
        </tr>
    );
};

export default BlogTableItem;