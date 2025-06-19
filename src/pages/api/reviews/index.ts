import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'No autorizado' });

  if (req.method === 'GET') {
    const reviews = await prisma.review.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(reviews);
  }

  if (req.method === 'POST') {
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

    return res.status(201).json(newReview);
  }

  res.status(405).end(); // Método no permitido
}