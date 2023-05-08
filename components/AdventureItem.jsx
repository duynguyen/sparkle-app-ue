import Image from "next/image";
import {getPublishHost} from "../utils/fetchData";
import Link from "next/link";

export default function AdventureItem(props) {
  const editorProps = {
    itemID: "urn:aemconnection:" + props?._path + "/jcr:content/data/master",
    itemType: "reference",
    itemfilter: "cf"
  };

  // Must have title, path, and image
  if(!props || !props._path || !props.title || !props.primaryImage ) {
    return null;
  }

  return (
    <li className="adventure-item" itemScope {...editorProps}>
      <div className="adventure-image-card">
      <Link href={`/adventures/${props.slug}${window.location.search}`}>
        <a>
          <img className="adventure-item-image" itemType="image" itemProp="primaryImage"
            src={`${getPublishHost()}${props.primaryImage._path}`} alt={props.title}/>
        </a>
      </Link>
      </div>
      <h3 className="adventure-item-title" itemProp="title" itemType="text">{props.title.toLowerCase()}</h3>
      <div className="adventure-item-details">
        <div className="adventure-item-length pill default"><span itemProp="tripLength" itemType="text">{props.tripLength?.toLowerCase()}</span></div>
        <div className="adventure-item-price pill">$<span itemProp="price" itemType="text">{props.price}</span></div>
      </div>  
    </li>
  );
}
