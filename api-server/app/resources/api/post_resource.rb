module Api
  class PostResource < JSONAPI::Resource
    attributes :title, :body
    relationship :comments, to: :many
  end
end
