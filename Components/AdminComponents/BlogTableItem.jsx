import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogTableItem = ({authorImg,title,author,date,confirmDeleteBlog,mongoId}) => {
    const BlogDate = new Date(date);
    return (
        <tr className='bg-white border-b'>
          <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            <Image width={40} height={40} src={authorImg?authorImg:"No author image"} alt=''/>
            <p>{author?author:"No author"}</p>

          </th>
            <td className='px-6 py-4'>
                {title?title:"No title"}

            </td>
            <td className='px-6 py-4'>
                {BlogDate.toDateString()}

            </td>
            <td  className='px-6 py-4 cursor-pointer'>
               <Link href={`/admin/updateProduct/${mongoId}`}> <button>Edit</button></Link>

            </td>
            <td onClick={()=>confirmDeleteBlog(mongoId)} className='px-6 py-4 cursor-pointer'>
                x

            </td>
        </tr>
    );
};

export default BlogTableItem;