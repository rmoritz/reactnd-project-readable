import React from 'react';
import * as ReactRedux from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Column } from 'rebass';
import { LinkIcon } from './custom-styled';

class CommentList extends React.Component {
    static propTypes = {
        for: PropTypes.string.isRequired
    }

    render() {
        let { comments } = this.props;
        const postId = this.props.for;

        comments = comments.filter((c) => c.parentId === postId);

        return (
            <div>
                {
                    comments.map((c) =>
                    (
                        <div key={c.id}>
                            <Row>
                                <Column width={2/5}>{c.author}</Column>
                                <Column width={1/5}>{c.voteScore}</Column>
                                <Column width={1/5}><LinkIcon icon="thumbs-up" /></Column>
                                <Column width={1/5}><LinkIcon icon="thumbs-down" /></Column>
                            </Row>
                            <Row>
                                <Column>{c.body}</Column>
                            </Row>
                        </div>
                    ))
                }
            </div>
        );
    }
}

function mapStateToProps({ comments }) {
    return { comments };
}

export default ReactRedux.connect(mapStateToProps)(CommentList);