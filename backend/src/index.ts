import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API: List colleges with Search, Filters, and Pagination
app.get('/colleges', async (req, res) => {
  try {
    const { search, location, maxFees, page = '1', limit = '10' } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build the query
    const where: any = {};

    if (search) {
      where.name = {
        contains: String(search),
        mode: 'insensitive',
      };
    }

    if (location) {
      where.location = {
        contains: String(location),
        mode: 'insensitive',
      };
    }

    if (maxFees) {
      where.fees = {
        lte: Number(maxFees),
      };
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take,
        orderBy: { rating: 'desc' },
      }),
      prisma.college.count({ where }),
    ]);

    res.json({
      data: colleges,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// API: Get college by ID
app.get('/colleges/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const college = await prisma.college.findUnique({
      where: { id: Number(id) },
      include: { courses: true },
    });

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    res.json(college);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch college' });
  }
});

// API: Compare colleges
app.get('/compare', async (req, res) => {
  try {
    const { ids } = req.query; // expected format: comma separated list of ids: ids=1,2,3
    if (!ids || typeof ids !== 'string') {
      return res.status(400).json({ error: 'Provide a comma-separated list of college IDs string' });
    }

    const idArray = ids.split(',').map((id) => Number(id)).filter(id => !isNaN(id));

    if (idArray.length < 2) {
      return res.status(400).json({ error: 'Provide at least two valid IDs to compare' });
    }
    if (idArray.length > 5) {
      return res.status(400).json({ error: 'Cannot compare more than 5 colleges at a time' });
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: { in: idArray },
      },
      include: { courses: true },
    });

    res.json(colleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch comparison data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
