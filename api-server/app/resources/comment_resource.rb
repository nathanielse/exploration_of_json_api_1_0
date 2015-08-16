class CommentResource < JSONAPI::Resource
  attributes :content
  relationship :author, to: :one, class_name: 'User', foreign_key: :user_id, relation_name: :user
end
