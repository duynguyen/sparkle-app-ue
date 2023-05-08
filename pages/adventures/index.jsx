import useGraphQL from '../../lib/useGraphQL';
import Loading from '../../components/base/Loading';
import AdventureItem from '../../components/AdventureItem';
import Header from "../../components/Header";
import { getPublishHost } from '../../utils/fetchData';
import Title from '../../components/base/Title';

export default function Adventures(props) {
  const persistentQuery = 'wknd-shared/adventures-all';
  //Use a custom React Hook to execute the GraphQL query
  const { data, errorMessage } = useGraphQL(persistentQuery);

  //If there is an error with the GraphQL query
  if(errorMessage) return;

  //If data is null then return a loading state...
  if(!data) return <Loading />;

  return (
    <>
      <Header isAuthorVersion='false' host={getPublishHost()} />
      <section id="adventures" className="adventures">
        <Title itemID="urn:aemconnection:/content/wknd/us/en/adventures/jcr:content/root/container/container/title" itemType="text" itemProp="jcr:title"/>      
        <ul className="adventure-items">
          {
              //Iterate over the returned data items from the query
              data.adventureList.items.map((adventure, index) => {
                return (
                  <AdventureItem key={index} {...adventure} />
                );
              })
          }
          </ul>
      </section>
    </>
  );
}