
import { FastifyInstance } from 'fastify'
import Post from './Post'

export default (app: FastifyInstance) => {
    Post(app)
}