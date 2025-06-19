import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'No autorizado' });

  if (req.method !== 'POST') return res.status(405).end();

  const { bookTitle, rating, review, mood } = req.body;

  if (!bookTitle || !rating || !review || !mood)
    return res.status(400).json({ error: 'Faltan datos' });

  const newReview = await prisma.review.create({
    data: {
      bookTitle,
      rating: parseInt(rating),
      review,
      mood,
      userId: (user as any).userId,
    },
  });

  res.status(201).json(newReview);
}