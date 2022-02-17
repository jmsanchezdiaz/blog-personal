import { getPosts } from '../../../src/dbcontrollers/controllers';
import { formatDate } from '../../../src/helpers/helpers';

export default async function handler(req, res) {
  let { input } = req.query;
  input = input.toLowerCase().trim();

  if (!input) {
    res.status(400).json({ msg: 'Invalid Input' });
    throw new Error('Invalid input');
  }

  const posts = await getPosts();

  const filteredPosts = posts.filter((post) => {
    let tagsInLowerCase = post.tags?.map((tag) => tag.toLowerCase());
    let formattedDate = formatDate(post.date);
    return (
      post.title.toLowerCase().includes(input) ||
      tagsInLowerCase?.some((tag) => tag.includes(input)) ||
      post.content.toLowerCase().includes(input) ||
      formattedDate.toLowerCase().includes(input)
    );
  });

  let responseMsg = `${filteredPosts.length} resultados de busqueda para: ${input}`;

  res.status(200).json({
    msg: responseMsg,
    results: filteredPosts,
  });
}
