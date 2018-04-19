import React from 'react';
import * as ReactRedux from 'react-redux';
import * as PostActions from '../actions/posts';
import { Modal, Relative, Absolute, Row, Column } from 'rebass';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PostList from './postlist';
import { Subhead, LinkButton } from '../components/custom-styled';
import PostEditor from '../components/post-editor';

class PostsSummary extends React.Component {
    constructor() {
        super();

        this.state = {
            postEditorVisible: false,
            selectedPost: null
        };
    }

    render() {
        const { match } = this.props;
        const category = match.params[0];
        const { postEditorVisible, selectedPost } = this.state;
        const savePost = this.savePost.bind(this);
        const selectPostAndToggleEditor =
              this.selectPostAndToggleEditorVisibility.bind(this);
        const savePostAndHideModal =
              (post) => savePost(post)
              .then(() => selectPostAndToggleEditor());

        return (
            <div>
              {
                  (postEditorVisible &&
                   <Modal width={512}>
                      <PostEditor onSubmit={savePostAndHideModal}
                                      category={category}                                                     initialValues={selectedPost} />
                   </Modal>)
              }
              <Row mt={4}>
                <Column width={3/4}>
                  {
                      (category && <Subhead children={`Posts in category ${match.params[0]}`} />)
                        || (<Subhead children="All posts" />)
                  }
                </Column>
                <Column width={1/4}>
                  <Relative>
                    <Absolute right={0}>
                      <LinkButton mr={2} onClick={() => selectPostAndToggleEditor()}>
                        <FontAwesomeIcon icon="plus-square" />
                        &nbsp; Add post
                      </LinkButton>
                    </Absolute>
                  </Relative>
                </Column>
              </Row>
                {
                  (category && <PostList
                   predicate={(post) => post.category === match.params[0]}
                   editPost={selectPostAndToggleEditor} />)
                      || (<PostList editPost={selectPostAndToggleEditor} />)
              }
            </div>
        );
    }

    selectPostAndToggleEditorVisibility(post) {
        const { postEditorVisible } = this.state;
        this.setState({
            ...this.state,
            selectedPost: post,
            postEditorVisible: !postEditorVisible
        });
    }

    savePost(post) {
        const { dispatch } = this.props;
        if (post.id) {
            return dispatch(PostActions.updatePost(post));
        }
        else {
            return dispatch(PostActions.createPost(post));
        }
    }
}

export default ReactRedux.connect()(PostsSummary);
