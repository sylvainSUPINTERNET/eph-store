import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { FaBeer, FaPaw } from 'react-icons/fa';
import { BsCheckLg, BsCart, BsFillArrowDownCircleFill } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { url } from 'inspector';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = ({ task, storeTarget }: { task: any, storeTarget: any }) => {

  let [countCart, setCountCart] = useState(0);

  const addToCart = () => {
    let c = sessionStorage.getItem("cartPro");
    if (c === null || isNaN(parseInt(c)) || parseInt(c) < 0) {
      sessionStorage.setItem("cartPro", `${1}`);
    } else {
      let tmp = parseInt(c) + 1;
      sessionStorage.setItem("cartPro", `${tmp}`)
    }
    setCountCart(parseInt(sessionStorage.getItem("cartPro") as string))
    toast("Ajouter au panier !");
  }

  useEffect(() => {
    console.log("use effect")
    if (sessionStorage.getItem("cartPro") !== null) {

      if (isNaN(parseInt(sessionStorage.getItem("cartPro") as string))) {
        sessionStorage.setItem("cartPro", "0");
        setCountCart(0);
      } else {
        setCountCart(parseInt(sessionStorage.getItem("cartPro") as string));
      }

    }
  }, [countCart]);

  return (

    <div className="flex flex-col h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <ToastContainer />
      <header className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  h-20 p-5">
        <nav className="flex justify-between">
          
          <div className="ml-8 text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex"><FaPaw className="mr-1 mt-0.5" /> {storeTarget.brandName}</div>
          {/* <span className="relative inline-block mr-5 mt-2 cursor-pointer" onClick={ ev => window.location.href = "/payment/checkout"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {
              countCart > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {countCart}
              </span>
            }

          </span> */}



        </nav>
      </header>
      <div className="flex-grow">
        {/* <header className="relative flex items-center justify-center h-screen mb-0 overflow-hidden">
          <div
            className="relative z-30 p-5 text-2xl text-white p-2 rounded-xl"
          >
          </div>
          <div
            className="relative z-30 p-5 text-2xl text-white p-2 rounded-xl"
          >
            <a className="rounded shadow-lg opacity-90 p-2 w-190 font-bold text-4xl" href="#product">Collier lumineux pour votre amour sur patte !</a>
          </div>

          <video
            autoPlay
            loop
            muted
            className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </header> */}
      </div>

      <div className="flex-grow bg-gradient-to-t from-white via-gray-100 to-white text-center" id="product">
        <div className="flex mt-3 mb-3 justify-center">
          {/* <a className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" href="/payment/checkout" >Je commande</a> */}
          {/* <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Type : </button> */}
        </div>
        <div className="container mx-auto">
        <p className="mb-5 text-4xl">{storeTarget.pageTitle1}</p>
        <p className="mb-5 text-lg justify-content">{storeTarget.mainDescription}</p>
        </div>

        <div className="flex mt-3 mb-3 justify-center">
          <a className="m-2 
          bg-gradient-to-r from-red-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500
          text-white font-bold py-5 px-4 rounded text-4xl mt-5 mb-5 shadow-lg" href="/payment/checkout" >Je commande</a>
          {/* <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Type : </button> */}
        </div>
        {
          storeTarget.points.map((point: any) => {
            return (
              <div className="flex-1 p-4 container mx-auto text-justify mb-5 rounded">
                <div className="flex mt-3 justify-center bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 to-purple rounded-t">
                  <img className="w-80 mt-10 rounded-full mb-10" src={storeTarget.pageMainPics[0]} />
                </div>
                <div className="bg-white text-black p-5 rounded-b shadow-lg">
                  <h3 className="text-2xl font-bold">{point.title}</h3>
                  <div className="w-full mb-4">
                    <div
                      className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t bg-black mt-3"
                    ></div>
                  </div>
                  <p className="text-center mb-5">{point.content}</p>
                </div>


              </div>
            )
          })
        }
        
        <div className="flex mt-3 mb-3 justify-center">
          {/* <a className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-xl mt-5 mb-5" href="/payment/checkout" >Je commande</a> */}
          {/* <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Type : </button> */}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 h-20 p-5 text-center text-white">
        <div className="flex">
          <div className="flex-1 m-1">           
          
           <p className="font-bold">sylvain.joly00@gmail.com</p>

            <a href="/CGU">CGU</a>
          </div>
        </div>
      </div>
    </div>

    // <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    //   <header>
    //     <nav className="p-8">
    //       <div className="ml-8 text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex"><FaPaw className="mr-1 mt-0.5" /> {storeTarget.brandName}</div>
    //     </nav>
    //   </header>

    //   <div>
    //     <section className="flex text-white mt-18 container mx-auto px-4 justify-center items-center lg:text-4xl font-bold text-2xl ">
    //       <h2>{storeTarget.pageTitle1}</h2>
    //     </section>
    //     <div className="w-full mb-4">
    //       <div
    //         className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t bg-white mt-3"
    //       ></div>
    //     </div>

    //     {/* <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-40">
    //       <div className="md:flex">
    //         <div className="md:flex-shrink-0">
    //           <img className="h-48 w-full object-cover md:h-full md:w-48" src={storeTarget.pageMainPics[0]} alt="Man looking at item at a store"/>
    //         </div>
    //         <div className="p-8">
    //           <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
    //           <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
    //           <p className="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
    //         </div>
    //       </div>
    //     </div> */}

    //     <p className="text-center mt-10 mb-3 text-white text-2xl">{storeTarget.productName.charAt(0).toUpperCase() + storeTarget.productName.slice(1)}</p>
    //     <div className="flex flex-flow justify-center mt-18">
    //       <img src={storeTarget.pageMainPics[0]} className="rounded-lg w-80 p-1 mt-5"></img>
    //     </div>

    //     <div className="flex justify-center mt-5 text-white">

    //     </div>
    //     <div className="flex bg-gray justify-center mt-5">
    //       <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center shadow-lg mb-5">
    //         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    //         </svg>            <span>Ajouter au panier</span>
    //       </button>
    //     </div>

    //     <footer className="bg-red-600">
    //       <p>OK</p>
    //     </footer>
    //     {/* <div className="text-center mt-10 container mx-auto w-80">
    //       {
    //         storeTarget.points.map( (point:string) => {
    //           // return (<div className="flex justify-center">
    //           //   <BsCheckLg className="mr-3 bg-red-300 rounded-full p-1 mt-1"/>{point.charAt(0).toUpperCase() + point.slice(1)}
    //           // </div>)
    //           return ( <div className="bg-white mb-3">
    //             {point.charAt(0).toUpperCase() + point.slice(1)}
    //             </div>)
    //         })
    //       }
    //     </div> */}


    //     {/* <div className="flex flex-flow justify-center mt-40"> 
    //       <div className="flex-initial">
    //         <img src={storeTarget.pageMainPics[0]} className="rounded w-3/4"></img>
    //       </div>
    //       <div className="text-white text-2xl">
    //           <div className="ml-8 text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex mt-14"><BsCheckLg className="mr-3 bg-red-300 rounded-full p-1 mt-1"/> Safety</div>
    //           <div className="ml-8 text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex mt-5"><BsCheckLg className="mr-3 bg-red-300 rounded-full p-1 mt-1"/> Safety</div>
    //           <div className="ml-8 text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex mt-5"><BsCheckLg className="mr-3 bg-red-300 rounded-full p-1 mt-1"/> Safety</div>
    //           <div className="ml-8 text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex mt-5"><BsCheckLg className="mr-3 bg-red-300 rounded-full p-1 mt-1"/> Safety</div>
    //           <div className="ml-8 text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl flex mt-5"><BsCheckLg className="mr-3 bg-red-300 rounded-full p-1 mt-1"/> Safety</div>
    //       </div>
    //     </div> */}

    //     {/* <div className="container mx-auto mt-40">
    //       <div className="flex mb-24 p-2 text-center">
    //         <img src={storeTarget.pageMainPics[0]} className="rounded-full w-1/4 mx-auto shadow-lg"></img>
    //         <div className="mx-auto">
    //           <ul>
    //             <li>lorem ipsum</li>
    //             <li>lorem ipsum</li>
    //             <li>lorem ipsum</li>
    //             <li>lorem ipsum</li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div> */}



    //   </div>


    // </div>

  )

}

export default Home


export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json()

  // The value of the `props` key will be
  //  passed to the `Home` component

  let storeName: string = (process.env.STORE_NAME as string);
  // storeName.charAt(0).toUpperCase();
  // console.log(storeName);
  storeName[0].toUpperCase()

  return {
    props: {
      task: data,
      storeTarget: {
        "brandName": storeName.charAt(0).toUpperCase() + storeName.slice(1),
        "pageTitle1": "Big title ONE",
        "mainDescription": "orem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ligula ipsum, tincidunt eu magna a, sodales ullamcorper purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam turpis, sodales id fermentum sed, rutrum id nunc. Praesent blandit leo quis ultrices bibendum. Vestibulum eget vehicula felis.",
        "productName": "Collier anti-perte lumineux à led pour chiens",
        "pageMainPics": [
          "https://www.cdiscount.com/pdt2/1/6/3/1/700x700/som2009194913163/rw/led-collier-pour-chiens-lumineux-collier-de-chien.jpg"
        ],
        "points": [
          {
            "title": "Lorem ipsum",
            "content": "orem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ligula ipsum, tincidunt eu magna a, sodales ullamcorper purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam turpis, sodales id fermentum sed, rutrum id nunc. Praesent blandit leo quis ultrices bibendum. Vestibulum eget vehicula felis."
          },
          {
            "title": "Lorem ipsum",
            "content": "orem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ligula ipsum, tincidunt eu magna a, sodales ullamcorper purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam turpis, sodales id fermentum sed, rutrum id nunc. Praesent blandit leo quis ultrices bibendum. Vestibulum eget vehicula felis."
          },
          {
            "title": "Lorem ipsum",
            "content": "orem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ligula ipsum, tincidunt eu magna a, sodales ullamcorper purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam turpis, sodales id fermentum sed, rutrum id nunc. Praesent blandit leo quis ultrices bibendum. Vestibulum eget vehicula felis."
          }
        ],
        "productPrice": 15.99
      }
    }
  }
}
