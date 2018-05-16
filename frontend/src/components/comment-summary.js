import React from 'react';
import * as ReactRedux from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Divider } from 'rebass';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Subhead, LinkButton } from './custom-styled';
import CommentList from './comment-list';

class CommentSummary extends React.Component {
    static propTypes = {
        parentId: PropTypes.string.isRequired,
        editComment: PropTypes.func.isRequired
    }

    render() {
        const {
            parentId,
            editComment
        } = this.props;
        const createComment = this.createComment.bind(this);

        return (
            <div>
                <Subhead mt={4} mx={0} children="Comments" />
                <Box mt={2} ml={2}>                
                  <CommentList parentId={parentId}
                               editComment={editComment} />
                </Box>
                <Divider w={1} color='black' />

                <LinkButton fg='white' bg='black' mr={2} mb={4}
                            onClick={createComment}>
                    <FontAwesomeIcon icon="plus-square" /> &nbsp; Add comment
                </LinkButton>
            </div>
        );
    }

    createComment() {
        const { parentId, editComment } = this.props;
        const c = { parentId };
        editComment(c);
    }
}

export default ReactRedux.connect()(CommentSummary);