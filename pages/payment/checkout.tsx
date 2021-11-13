import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import Link from 'next/link'
import Image from 'next/image'



const CheckoutPaypal = ({ task, storeTarget, env }: { task: any, storeTarget: any, env:any }) => {
    let [count, setCount] = useState(1);
    let [stockError, setStockError] = useState("Limite de stock atteint.");
    let [isOutOfStock, setIsOutOfStock] = useState(false);
    let [paySuccess, setPaySuccess] = useState(false);

    let computePrice = (price: number): number => {
        return +((price * count).toFixed(2));
    }


    let computeTVA = () => {
        return +(((storeTarget.productPrice / 100) * 20).toFixed(2));
    }

    let computePriceTotal = (price: number): number => {
        return +(((price * count) + computeTVA()).toFixed(2));
    }


    let increaseQuantity = () => {
        let tmp = count + 1;

        if (tmp > storeTarget.stockLimit) {
            setIsOutOfStock(true);
        } else {
            setCount(tmp);
        }
    }

    let decreaseQuantity = () => {
        let tmp = count - 1;
        if (isOutOfStock) {
            setIsOutOfStock(false);
        }
        if (tmp <= 0) {
            setCount(1);
        } else {
            setCount(tmp)
        }
    }
    useEffect(() => {
        if (window) {

        }
    }, [count])

    
    // let createOrder = (data:any, actions:any) => {
    //     console.log("xd",count);
    //     return actions.order.create({
    //         purchase_units: [
    //             {
    //                 amount: {
    //                     value: `${computePriceTotal(storeTarget.productPrice)}`,
    //                 },
    //             },
    //         ],
    //     });
    // }

    
    // use useCallback to only update the value of `createOrder` when the `amount` changes 
    const createOrder = useCallback((data:any, actions:any) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: `${computePriceTotal(storeTarget.productPrice)}`,
                        },
                    },
                ],
            })
            .then((orderID:any) => {
                return orderID;
            });
    }, [count]);


    // const getRealCount = () => {
    //     let currentCount = sessionStorage.getItem("cartPro");
    //     if ( currentCount === null || currentCount === undefined ) {
    //         return 1;
    //     }

    //     if ( currentCount ) {
    //         if ( parseInt(currentCount) <= 0 ) {
    //             return 1
    //         } else {
    //             return parseInt(sessionStorage.getItem("cartPro") as string);
    //         }
    //     } else {
    //         return 1
    //     }
    // }

    const paypalOptions = {
        "client-id": `${env.PAYPAL_CLIENTID}`,
        currency: "EUR",
        intent: "capture"
    }

    return (

        <div>
            <div className="flex">
                <Link href="/">
                    <a className="mt-10 ml-5"><AiOutlineArrowLeft /> Acceuil</a>
                </Link>
            </div>

            { paySuccess === true &&
                <div className="flex justify-center mt-60">
                    <div className="text-center font-bold text-4xl">
                        <p>Un mail de confirmation vous sera envoyé</p>
                        <p>Merci pour votre confiance !</p>
                    </div>
                </div>
            }

            {
                paySuccess === false && 
                <div className="text-center mt-10">
                <h1 className="text-center text-4xl mt-10">Commander</h1>
                <div className="flex justify-center ">
                    <div className="shadow-lg p-5 max-w-xl rounded mt-5 mb-5 flex-1 ">
                        <p className="ml-3 text-base mb-5 mt-3 font-bold ">{storeTarget.productName}</p>
                        <div className="flex  shadow-lg p-5">
                            <Image loader={({src, width, quality}) => {
                                return `${storeTarget.pageMainPics[0]}`
                            }} 
                            src={"product.png"} className="rounded shadow-lg" height={256} width={256}/>
                            <p className="ml-3 text-base">{storeTarget.checkoutDescription}</p>
                        </div>
                        <div className="shadow-lg p-5">
                            <div className="flex justify-center">
                                <button className="m-3 rounded-full m-2  w-10 font-bold text-lg bg-gray-300 shadow-lg" onClick={increaseQuantity}>+</button>
                                <p className="m-3 text-lg">{count}</p>
                                <button className="m-3 rounded-full m-2  w-10 font-bold	text-lg bg-gray-300 shadow-lg" onClick={decreaseQuantity} >-</button>
                            </div>
                            <div className="bg-gray-200 rounded shadow-md">
                                <div className="mb-5 mt-5 flex justify-between">
                                    <div className="flex-1 text-lg p-2">Prix</div>
                                    <div className="flex-1 text-lg p-2">{`${storeTarget.productPrice}`}€</div>
                                </div>
                                <div className="mb-5 mt-5 flex justify-between">
                                    <div className="flex-1 text-lg p-2">Frai livraison</div>
                                    <div className="flex-1 text-lg p-2">{storeTarget.shippingFare}€</div>
                                </div>
                                <div className="mb-5 mt-5 flex justify-between bg-green-200 rounded shadow-md">
                                    <div className="flex-1 text-lg font-bold p-2">Total (TTC) </div>
                                    <div className="flex-1 text-lg font-bold p-2">{computePriceTotal(storeTarget.productPrice)}€</div>
                                </div>
                            </div>


                            {
                                isOutOfStock === true && <div className="bg-red-500 rounded text-lg font-bold text-white shadow-lg"><p className="mt-5 mb-5 p-2">{stockError}</p></div>
                            }


                            {


                                isOutOfStock === false && <PayPalScriptProvider options={paypalOptions}>
                                    <p className="mt-2 mb-3 text-sm text-gray-600 font-bold"> <span className="text-red-700">*</span>Livraison disponible uniquement en france métropolitaine</p>
                                    <PayPalButtons
                                        forceReRender={[createOrder]as unknown[]}
                                        style={{ layout: "horizontal", color: "white", shape: "rect", label: "pay", height: 40, "tagline": false }}
                                        createOrder={createOrder}
                                        onApprove={ async (data, actions):Promise<any> => {
                                            const {orderID, payerID} = data;

                                            let payload = {
                                                orderID,
                                                payerID
                                            }
                                            const res = await fetch(`${env.API}/api/transactions/${storeTarget.brandName}`, {
                                                method: "POST",
                                                body: JSON.stringify(payload)
                                            });
                                            
                                            if ( res.status === 200 ) {
                                                setPaySuccess(true);
                                                setCount(1);
                                                    return new Promise( (resolve, reject) => {
                                                            resolve("ok");
                                                    });
                                            } else {
                                                setPaySuccess(false);
                                                setCount(1);
                                                alert("Une erreur est survenue lors de votre transaction.")
                                                return new Promise( (resolve, reject) => {
                                                        reject("error");
                                                });
                                            }


                                        }}
                                        onError={ (err) => {
                                            alert("Une erreur est survenue lors de votre paiement, veuillez réessayer plus tard.")
                                        }}
                                    />
                                   {/* <table cellPadding="10" cellSpacing="0" align="center"><tbody><tr><td align="center"></td></tr><tr><td align="center"><a href="https://www.paypal.com/fr/webapps/mpp/paypal-popup" title="PayPal payment type support" onclick="javascript:window.open('https://www.paypal.com/fr/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"><img src="https://www.paypalobjects.com/webstatic/mktg/logo-center/logo_paypal_paiements_securises_fr.jpg" border="0" alt="PayPal Acceptance Mark" /></a></td></tr></tbody></table>
                                   <table border="0" cellpadding="10" cellspacing="0" align="center"><tbody><tr><td align="center"></td></tr><tr><td align="center"><a href="https://www.paypal.com/fr/webapps/mpp/paypal-popup" title="PayPal Comment Ca Marche" onclick="javascript:window.open('https://www.paypal.com/fr/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"><img src="https://www.paypalobjects.com/webstatic/mktg/logo-center/logo_paypal_securise_fr.png" border="0" alt="Securise par PayPal" /></a><div style={{"textAlign" :"center"}}><a href="https://www.paypal.com/fr/webapps/mpp/why" target="_blank"><font size="2" face="Arial" color="#0079CD"></font></a></div></td></tr></tbody></table> */}
                                </PayPalScriptProvider>
                            }

                        </div>

                    </div>
                </div>




            </div>
            }

            
        </div>
    )
};


export default CheckoutPaypal;




export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const data = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json()

    const env = {
        PAYPAL_CLIENTID: process.env.PAYPAL_CLIENTID,
        API: process.env.API
    };
    // The value of the `props` key will be
    //  passed to the `Home` component

    let storeName: string = (process.env.STORE_NAME as string);
    // storeName.charAt(0).toUpperCase();
    // console.log(storeName);
    storeName[0].toUpperCase()
    return {
        props: {
            env,
            storeTarget: {
                "brandName": storeName.charAt(0).toUpperCase() + storeName.slice(1),
                "pageTitle1": "Big title ONE",
                "productName": "Collier anti-perte lumineux à led pour chiens",
                "globalDescAndCheckout": "Collier pour chien lumineux, large, couleur verte",
                "checkoutDescription": "orem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ligula ipsum, tincidunt eu magna a",
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
                "productPrice": 15.99,
                "shippingFare": 1.99,
                "stockLimit": 10
            }
        }
    }
};