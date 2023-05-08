/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import backIcon from '../../images/Back.svg';
import Error from '../../components/base/Error';
import Loading from '../../components/base/Loading';
import Header from '../../components/Header';
import useGraphQL from '../../lib/useGraphQL';
import { getPublishHost } from '../../utils/fetchData';
import { mapJsonRichText } from '../../utils/renderRichText';
import Image from 'next/image';
import Footer from '../../components/Footer';

function ArticleDetail() {
	const router = useRouter();

	// params hook from React router
	const slug = router.query.slug;

	const persistentQuery = `wknd-shared/article-by-slug;slug=${slug}`;

	//Use a custom React Hook to execute the GraphQL query
	const {data, errorMessage} = useGraphQL(persistentQuery);

	//If there is an error with the GraphQL query
	if (errorMessage) return <Error errorMessage={errorMessage}/>;

	//If query response is null then return a loading icon...
	if (!data) return <Loading/>;

	//Set article properties variable based on graphQL response
	const currentArticle = getArticle(data);

	// set references of current article
	const references = data.articleList._references;

	//Must have title, path, and image
	if (!currentArticle) {
		return <NoArticleFound/>;
	}

	const editorProps = {
		itemID: "urn:aemconnection:" + currentArticle._path + "/jcr:content/data/master",
		itemType: "reference",
		itemfilter: "cf"
	};

	return (
		<>
			<Header isAuthorVersion='false' />
			<section className="main adventures">
				<div {...editorProps} itemScope className="adventure-detail">
				<div className="adventure-detail-header">
						<Link className="adventure-detail-close-button" href={`/articles${window.location.search}`}>
							<a><Image
								src={backIcon}
								alt="Return"
							/></a>
						</Link>
							<h1 className="adventure-detail-title" itemProp="title" itemType="text">{currentArticle.title}</h1>
					</div>
					<ArticleDetailRender {...currentArticle} slug={slug}/>
				</div>
			</section>
			<Footer />
		</>
    );
}

function ArticleDetailRender({
	_path, title,
	featuredImage, slug,
	main,
	authorFragment
}) {


return (
	<div>
		<img className="adventure-detail-primaryimage" itemType="image" itemProp="featuredImage"
		src={`${getPublishHost()}${featuredImage._path}`} alt={title}/>
		<div className="adventure-detail-content">			
		<div itemProp="main" itemType="richtext">{mapJsonRichText(main.json)}</div>
		</div>
	</div>);
}

function NoArticleFound() {
	return (
		<div className="adventure-detail">
			<Link className="adventure-detail-close-button" href={`/articles${window.location.search}`}>
				<a><Image
					src={backIcon}
					alt="Return"
				/></a>
			</Link>
			<Error errorMessage="Missing data, article could not be rendered."/>
		</div>
	);
}

/**
 * Helper function to get the first article from the response
 * @param {*} response
 */
function getArticle(data) {

	if (data && data.articleList && data.articleList.items) {
		// expect there only to be a single article in the array
		if (data.articleList.items.length === 1) {
			return data.articleList.items[0];
		}
	}
	return undefined;
}

export default ArticleDetail;
