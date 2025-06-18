import React from 'react';
import {Trash} from "lucide-react";
import Image from 'next/image';

const SubsTableItem = ({blogTitle,subscriberEmail,subscriberImg,mongoId, date,deleteConfirm}) => {
    const emailDate = new Date (date);

    return (
        <tr className='bg-white border-b '>
            <td scope='row' className='items-center gap-3 flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap mr-6'>
                       <Image width={40} height={40} src={subscriberImg?subscriberImg:"No author image"} alt=''className='rounded-full w-11 h-11 '/>
                       <p>{subscriberEmail?subscriberEmail:"No subscriber email"}</p>
           
                     </td>
                       <td className='px-6 py-4 text-gray-900  min-w-[400px] lg:min-w-0 '>
                           {blogTitle?blogTitle:"No title"}
           
                       </td>
                       <td className='px-6 py-4 text-gray-900 min-w-[200px] lg:min-w-0'>
                           {emailDate.toDateString()}
           
                       </td>
                     
                       <td onClick={()=>deleteConfirm(mongoId)} className='pl-10 py-4 '>
                           <button title='Delete' className='cursor-pointer text-gray-900 hover:text-red-500'><Trash /></button> 
           
                       </td>

        </tr>
        
    );
};

export default SubsTableItem;