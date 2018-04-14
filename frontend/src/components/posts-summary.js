import React from 'react';
import * as ReactRedux from 'react-redux';
import { Relative, Absolute, Button, Row, Column } from 'rebass';
import PostList from './postlist';
import { Subhead } from '../components/custom-styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const PostsSummary = ({ match }) => (
    <div>
      <Row mt={4}>
        <Column width={3/4}>
          {
              (match && match.params && match.params.category
               && <Subhead children={`Posts in category ${match.params.category}`} />)
                || (<Subhead children="All posts" />)
          }
        </Column>
        <Column width={1/4}>
          <Relative>
            <Absolute right={0}>
              <Button mr={2} bg='black' fg='white'>
                <FontAwesomeIcon icon="plus-square"/>
                &nbsp; Add
              </Button>
          </Absolute>
          </Relative>
        </Column>
      </Row>
        {
          (match && match.params && match.params.category
             && <PostList predicate={(post) => post.category === match.params.category} />)
                || (<PostList/>)
        }
    </div>
);

export default ReactRedux.connect()(PostsSummary);
