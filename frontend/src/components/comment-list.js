import React from 'react';
import * as ReactRedux from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, Text, Row, Column } from 'rebass';
import { LinkIcon } from './custom-styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class CommentList extends React.Component {
    static propTypes = {
        forPost: PropTypes.string.isRequired
    }

    render() {
        let { comments } = this.props;
        const postId = this.props.forPost;

        comments = comments.filter((c) => c.parentId === postId);

        return (
            <div>
                {
                    comments.map((c) =>
                        (
                            <div key={c.id}>
                                <Text>{c.body} <Badge fg='white' bg='black'>{c.author}</Badge></Text>
                                <Row width={1/2}>
                                    <Column width={1/5}>
                                        <FontAwesomeIcon icon="star" /> {c.voteScore}
                                    </Column>
                                    <Column width={1/5}>
                                        <LinkIcon icon="thumbs-up" />
                                    </Column>
                                    <Column width={1/5}>
                                        <LinkIcon icon="thumbs-down" />
                                    </Column>
                                    <Column width={1/5}>
                                        <LinkIcon icon="edit" />
                                    </Column>
                                    <Column width={1/5}><LinkIcon icon="trash" /></Column>
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
