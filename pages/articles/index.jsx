import useGraphQL from '../../lib/useGraphQL';
import Loading from '../../components/base/Loading';
import ArticleItem from '../../components/ArticleItem';
import Header from "../../components/Header";
import Footer from '../../components/Footer';

function Articles() {
  const persistentQuery = 'wknd-shared/articles-all';
  //Use a custom React Hook to execute the GraphQL query
  const { data, errorMessage } = useGraphQL(persistentQuery);

  //If there is an error with the GraphQL query
  if(errorMessage) return;

  //If data is null then return a loading state...
  if(!data) return <Loading />;

  return (
    <>
      <Header isAuthorVersion='false' />
      <section className="main articles">
        <h2>Articles</h2>
        <ul>
          {
            //Iterate over the returned data items from the query
            data.articleList.items.map((article, index) => {
              return (
                <ArticleItem key={index} {...article} />
              );
            })
          }
          </ul>
      </section>
      <Footer />
    </>
  );
}

export default Articles;
