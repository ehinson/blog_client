import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useLocation, useRouteMatch } from 'react-router-dom'
import PostForm from '../components/Form/PostForm'

const AddEditPost = props => {
  const {post_id}  = useParams()
  return (
    <div>
      {post_id ? "Edit": "Add"}
      Post
      <PostForm />
    </div>
  )
}

AddEditPost.propTypes = {

}

export default AddEditPost
