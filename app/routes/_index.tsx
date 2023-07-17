import { Link, useLoaderData } from '@remix-run/react';
import { LoaderArgs } from '@shopify/remix-oxygen';
import { Image } from '@shopify/hydrogen';
import { AnimatePresence, motion } from "framer-motion"
import CollectionsPage from './collectionPage';
import { useEffect, useState } from 'react';
import { model } from '@components/atoms';
import { useAtom } from 'jotai';
import img from "../../public/images/frisuer.png"
import chair from "../../public/images/chair.png"
import duo from "../../public/images/duo.png"
import Sec from '@components/Section';
import DoubleSec from '@components/DoubleSection';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export function meta() {
  return [
    { title: 'Hydrogen' },
    { description: 'A custom storefront powered by Hydrogen' },
  ];
}

export async function loader({ context }: LoaderArgs) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const { collections }: any = useLoaderData() || {}
  const [stableData, setData] = useState(collections);
  const [m, setM] = useAtom(model)
  useEffect(() => {
    collections && setData(collections)
    // stableData && stableData.nodes.map((node: any) => {
    //   node.products.edges.map((edge: any) =>
    //     Object.values(edge).map((edgeItem: any) => {
    //       edgeItem.media.nodes.map((med: any) => {
    //         if (med.mediaContentType === 'MODEL_3D') {
    //           if (!m.find((item: any) => item.name === edgeItem.handle)) {
    //             m.push({ name: edgeItem.handle, url: `${med.sources[0].url}`, collection: node.handle }), console.log("pushed")
    //           }
    //         }
    //       })
    //     })
    //   )
    // })


  }, [collections])
  function solid(arg0: string): import("@fortawesome/fontawesome-svg-core").IconProp {
    throw new Error('Function not implemented.');
  }

  return (<>
        <DoubleSec props={{
      left: true,
      sectionClass: "relative border-[#222] border-l",
      children: (<>
        <div className='flex flex-col bg-[#141414] relative h-full w-full m-auto max-h-[375px] justify-center align-center'>
        <div className='mb-auto img__wrapper'>
              <h4>Denk immer daran</h4>
              <h1>Es ist alles nur Kopfsache</h1>
              </div>
          <div className="flex justify-center align-center flex-col h-full sec-pad_right gap-5 p-5">
            <img className="self-end my-0 mx-auto z-[2] w-[90%]" src={img} alt="Stephan und Simon" style={{  transformOrigin: "bottom right", maxWidth:"500px" }} />
          </div>
          <div className='mb-auto img__wrapper'>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
              <button className="btn__primary" type="button">Termin buchen</button>
            </div>
        </div>
      </>),
      deskChildren: (<>
        <div className="flex hero-grid_right justify-center align-center flex-col sec-pad_left">
          <div className='flex gap-5 flex-col px-10 py-5 justify-center align-center'>
          <div className=''>
              <h4>Denk immer daran</h4>
              <h1>Es ist alles nur Kopfsache</h1>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</p>
              <button className="btn__primary" type="button">Termin buchen</button>
            </div>
          </div>
        </div>
      </>
      )
    }} />
    <DoubleSec props={{
      left: true,
      sectionClass: "relative",
      children: (<>
        <div className='flex justify-center align-center absolute top-0 left-0 w-full h-full z-[1] overflow-hidden'>
          <div className='bg-grid_section2 flex flex-wrap w-full my-auto grid-cols-5 grid-rows-[repeat(2,_minmax(2rem,_1fr))] justify-center align-center'>
            <h2>Schneiden</h2>
            <h2>Waschen</h2>
            <h2>Fohnen</h2>
            <h2>Färben</h2>
            <h2>Stylen</h2>
            <h2>Föhnen</h2>
            <h2>Waxen</h2>
            <h2>Massieren</h2>
            <h2>Tönen</h2>
          </div>
        </div>
        <div className='grid grid-cols-1  relative  relative h-full w-full m-auto max-h-[70%] justify-center align-center'>
          <div className='flex justify-center align-center flex-col bg-[#111] p-5'>
            <img className="self-end mb-10  z-[2]" src={chair} alt="Stephan mit Kunde" style={{ scale: "0.9", transformOrigin: "bottom right" }} />
          </div>
        </div>
      </>),
      deskChildren: (<>
        <div className="flex justify-center align-center flex-col bg-[#101010] sec-pad_left realative ">
          <div className='img__wrapper flex justify-center align-center absolute top-0 left-0 w-full h-full z-[1] overflow-hidden'>
            <div className='bg-grid_section2 flex flex-wrap w-full my-auto grid-cols-5 grid-rows-[repeat(2,_minmax(2rem,_1fr))] justify-center align-center'>
              <h2>Schneiden</h2>
              <h2>Waschen</h2>
              <h2>Fohnen</h2>
              <h2>Färben</h2>
              <h2>Stylen</h2>
              <h2>Föhnen</h2>
              <h2>Waxen</h2>
              <h2>Massieren</h2>
              <h2>Tönen</h2>
            </div>
          </div>
          <div className='flex gap-5 flex-col px-10 py-5'>
            <div className=''>
              <h4>Unsere Philosophie:</h4>
              <h3>Bei uns ist jeder Kunde herzlich willkommen...</h3>
              <p>...ob nun jung, oder alt, wir freuen uns über deinen Besuch!</p>
            </div>
            <div className=''>
              <h4>Hier kann noch etwas hin</h4>
              <p>Kleiner Text, der nicht so viel beinhalten sollte, gerade mal ein paar zeilen oder so.</p>
              <button className='btn__outline' role='button' type="button">Call to Action</button>
            </div>
          </div>
        </div>
      </>
      )
    }} />
    <DoubleSec props={{
      left: false,
      sectionClass: "relative",
      children: (<>
        <div className='grid grid-cols-1  relative h-full w-full m-auto max-h-[70%] justify-center align-center'>
          <div className="flex justify-center align-center flex-col h-full sec-pad_left gap-5">
            <div className='mb-auto img__wrapper '>
              <h2>Hi, ich bin Stephan!</h2>
              <p>...zusammen mit Simon, werden wir dich verwandeln.</p>
            </div>
            <img className="self-end my-0 mx-auto z-[2] w-[90%]" src={duo} alt="Stephan und Simon" style={{ scale: "1", transformOrigin: "bottom right", maxWidth:"500px" }} />
            <div className='mt-auto img__wrapper '>
            <h4>Erfahre mehr über uns <a className='underline' aria-label='link'>hier!</a></h4>
              <p>Bleibe gerne mit uns in Verbindung:</p>
              <div className='socials flex justify-even my-5 w-full py-5'>
              <Link to=""><FontAwesomeIcon className='pr-10' icon={faFacebookF} /></Link>
              <Link to=""><FontAwesomeIcon className='pr-10' icon={faInstagram} /></Link>
              <Link to=""><FontAwesomeIcon className='pr-10' icon={faEnvelope} /></Link>
              <Link to=""><FontAwesomeIcon className='pr-10' icon={faMessage} /></Link>
              </div>
            </div>
          </div>
        </div>
      </>),
      deskChildren: (<>
        <div className="flex justify-center align-center flex-col sec-pad_right">
          <div className='border-l border-[#222] flex-auto flex'></div>
          <div className='flex gap-5 flex-col px-10 py-5 border-l border-b border-[#222]'>
            <div className=''>
              <h2>Hi, ich bin Stephan!</h2>
              <p>...zusammen mit Simon, werden wir dich verwandeln.</p>
            </div>
            <div className=''>
            <h4>Erfahre mehr über uns <a className='underline' aria-label='link'>hier!</a></h4>
              <p>Bleibe gerne mit uns in Verbindung:</p>
              <div className='socials flex justify-even my-5 w-full py-5'>
                <Link to=""><FontAwesomeIcon className='pr-10' icon={faFacebookF} /></Link>
                <Link to=""><FontAwesomeIcon className='pr-10' icon={faInstagram} /></Link>
                <Link to=""><FontAwesomeIcon className='pr-10' icon={faEnvelope} /></Link>
                <Link to=""><FontAwesomeIcon className='pr-10' icon={faMessage} /></Link>
              </div>
            </div>
          </div>
          <div className='flex flex-auto'></div>
        </div>
      </>
      )
    }} />
    <DoubleSec props={{
      left: false,
      sectionClass: "relative",
      children: (<>
        <div className='grid grid-cols-1  relative h-full w-full m-auto max-h-[70%] justify-center align-center'>
          <div className="flex justify-center align-center flex-col h-full sec-pad_left gap-5">
            <div className='mb-auto img__wrapper '>
            <h2>Finde tolle Produkte</h2>
            <p>...die zu dir passen.</p>
            </div>
            <img className="self-end my-0 mx-auto z-[2] w-[90%]" src={duo} alt="Stephan und Simon" style={{ scale: "1", transformOrigin: "bottom right", maxWidth:"500px" }} />
            <div className='mt-auto img__wrapper '>
            <button className='btn__primary'aria-label='link'>Zum Shop</button>
          </div>
          </div>
        </div>
      </>),
      deskChildren: (<>
        <div className="flex justify-center align-center flex-col sec-pad_right">
        
          <div className='flex gap-5 flex-col px-10 py-5'>
            <div className=''>
              <h2>Finde tolle Produkte</h2>
              <p>...die zu dir passen.</p>
            </div>
          <button className='btn__primary'aria-label='link'>Zum Shop</button>
          </div>
        </div>
      </>
      )
    }} />
    <section className="w-full gap-4" >
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead my-3">
        Collections
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
        {stableData.nodes.map((collection: any) => {
          return (
            <Link to={`/collections/${collection.handle}`} key={collection.id}>
              <div className="grid gap-4">
                {collection?.image && (
                  <Image
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                    key={collection.id}
                    sizes="(max-width: 32em) 100vw, 33vw"
                  />
                )}
                <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                  {collection.title}
                </h2>
                
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  </>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        products(first: 100) {
          edges {
          node {
          id
          handle
          title
          media(first: 10) {
            nodes {
              ... on MediaImage {
                mediaContentType
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
              ... on Model3d {
                id
                mediaContentType
                sources {
                  mimeType
                  url
                }
              }
            }
          }
          }
          }
          }
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
