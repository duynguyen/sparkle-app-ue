import Image from "next/image";
import Link from "next/link";
import { getPublishHost } from "../utils/fetchData";
import { mapJsonRichText } from '../utils/renderRichText';

export default function ArticleItem(props) {
  const { _path, title, synopsis, authorFragment, slug } = props;
  const editorProps = {
      itemID: "urn:aemconnection:" + _path + "/jcr:content/data/master",
      itemType: "reference",
      itemfilter: "cf"
  };
  return (
    <li className="article-item" itemScope {...editorProps}>
      <aside>
        <Image className="article-item-image"
          src={`${getPublishHost()}${authorFragment?.profilePicture._path}`}
          alt={title} itemProp="profilePicture" itemType="image"  width="350" height="350" />
      </aside>
      <article>
        <Link href={`/articles/${slug}${window.location.search}`}>
            <h3 data-id="title" itemProp="title" itemType="text">{title}</h3>
        </Link>

        <p>{`By ${authorFragment.firstName} ${authorFragment.lastName}`}</p>
        { synopsis && 
          <div className="article-content" itemProp='synopsis' itemType='richtext'>
            {mapJsonRichText(synopsis.json)}
          </div>
        }
        <Link href={`/articles/${slug}${window.location.search}`}>
          <button>Read more</button>
        </Link>
      </article>
    </li>
  );
}
