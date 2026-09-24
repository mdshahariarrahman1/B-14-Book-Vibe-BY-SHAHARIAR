import React from 'react';

import HeroImage from '@/asstc/pngwing 1.png'
import Image from 'next/image';

const BnanerPage = () => {
    return (
        <>
        
        <section className=' container mx-auto'>

        <div className=' flex justify-between bg-[#131313]/5 rounded-3xl items-center  pt-34 pb-31.5'>

            <div className='pl-30'>
                <p className='text-[56px] font-bold mb-12'>Books to freshen up<br/> your bookshelf</p>
                <button className='text-[20px] font-bold px-6 py-3 bg-[#23BE0A] text-[#FFFFFF] rounded-[12]'>View The List</button>
            </div>

            <div className='pr-60'>
                <Image src={HeroImage} width={318} height={394} alt='Hero Image' />
            </div>

        </div>

        </section>
        
        </>
    );
};

export default BnanerPage;