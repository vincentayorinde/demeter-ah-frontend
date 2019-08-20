import './index.scss';
import React, { Fragment, useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { viewArticleAction, cleanUpArticle } from '../../store/actions/viewArticle';
import { relatedArticlesAction, cleanUpRelatedArticles } from '../../store/actions/relatedArticles';
import RelatedArticles from '../../components/RelatedArticles/index';
import ArticleFeaturedImg from '../../components/ArticleFeaturedImg/index';
import AuthorProfile from '../../components/AuthorProfile/index';
import ShareAndDate from '../../components/ShareAndDate/index';
import Reactions from '../../components/Reactions/index';
import FlagArticle from '../../components/FlagArticle/index';
import ArticleTags from '../../components/ArticleTags/index';
import ArticleLoader from '../../components/ArticleLoader';
import Loader from '../../components/Loader';
import convertFromJSON from '../../utils/convertFromJSON';
import { featuredImgStyle, relatedArticleImg } from '../../utils';

const SpecificArticle = (props) => {
  const getBody = (raw) => {
    if (!raw) {
      return;
    }
    const articleBody = convertFromJSON(raw);
    return articleBody;
  };
  let detail;
  let [parsedData] = useState(null);
  let parsedBody;
  const {
    article,
    article: {
      title, body, image, readTime, createdAt, category, author, tags
    },
    articles,
    articleIsLoading,
    relatedIsLoading,
    match,
    history,
    articleError,
  } = props;

  const setTags = tags && tags.length >= 1 ? (
    tags.map(tag => (
      <div className="m-2" key={tag.ArticleTag.tagId}>
        <p className="sm:text-xs md:text-sm rounded-full sm:px-2 md:py-1 md:px-4 cursor-pointer border-2 border-solid border-purple-200 text-purple-200 bg-white">{tag.name}</p>
      </div>
    ))
  ) : (
    <p className="text-xs" />
  );

  const [bodyValue, setbodyValue] = useState(null);

  useEffect(() => {
    if (articleError) {
      history.push('/');
    }
  }, [articleError]);

  useEffect(() => {
    if (match.params.slug !== article.slug) {
      props.viewArticleAction(match.params.slug);
    }
    if (article && article.title && articles) {
      props.relatedArticlesAction(match.params.slug, category);
    }
    parsedData = body && JSON.parse(body);
    parsedBody = getBody(parsedData);
    setbodyValue(parsedBody && ReactHtmlParser(parsedBody));
    return () => {
      props.cleanUpArticle();
    };
  },
  [article, match.params.slug]);

  if (articleIsLoading) {
    detail = (
      <ArticleLoader />
    );
  } else {
    detail = (
      <div className="viewedArticle w-full text-center">
        <div className="article sm:w-11/12 md:w-9/12 max-w-page mx-auto relative">
          <ArticleFeaturedImg
            featuredImgStyle={featuredImgStyle}
            image={image}
            title={title}
          />
          <div className="md:flex sm:flex-row section-two sm:px-0 sm:py-2">
            <AuthorProfile
              author={author}
              readTime={readTime}
            />
            <ShareAndDate createdAt={createdAt} category={category} />
          </div>
          <div className="hr-line mt-2 mb-8" />
          <div className="flex section-three mb-8">
            <div className="text-gray-900 text-justify">
              { articleIsLoading ? <Loader /> : bodyValue}
            </div>
          </div>
          <div className="sm:flex-row md:flex section-four tags mb-8">
            <ArticleTags setTags={setTags} />
            <FlagArticle />
          </div>
          <Reactions />
          <div className="flex flex-col section-five mb-8 bg-gray-100 justify-center">
            <h2 className="w-8/12 mx-auto sm:text-center lg:text-left">Related Articles</h2>
            <div className="flex flex-row w-8/12 mx-auto sm:max-w-32 md:max-w-84 lg:max-w-96">
              { relatedIsLoading ? <Loader />
                : (
                  <RelatedArticles
                    articles={articles}
                    relatedArticleImg={relatedArticleImg}
                  />
                ) }
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {detail}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  article: state.viewArticle.article,
  articleError: state.viewArticle.error,
  articleIsLoading: state.viewArticle.isLoading,
  articleIsCompleted: state.viewArticle.isCompleted,
  articles: state.relatedArticles.articles,
  relatedError: state.relatedArticles.error,
  relatedIsLoading: state.relatedArticles.isLoading,
  relatedIsCompleted: state.relatedArticles.isCompleted,
});

export default connect(mapStateToProps, {
  viewArticleAction, cleanUpArticle, relatedArticlesAction, cleanUpRelatedArticles
})(SpecificArticle);