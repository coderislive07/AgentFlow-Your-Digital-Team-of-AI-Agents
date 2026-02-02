import { getMemory, addMemory, searchMemory } from '@/lib/storage';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const tag = searchParams.get('tag');

    let memory = getMemory();

    // Search by query
    if (query) {
      memory = searchMemory(query);
    }

    // Filter by tag
    if (tag) {
      memory = memory.filter((entry) =>
        entry.tags?.includes(tag.toLowerCase())
      );
    }

    // Sort by creation time (newest first)
    memory = memory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Get unique tags for tagging system
    const allTags = [...new Set(memory.flatMap((entry) => entry.tags || []))];

    return Response.json({
      success: true,
      memory: memory,
      tags: allTags,
      total: memory.length,
    });
  } catch (error) {
    console.error('Get memory error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, content, tags } = body;

    if (!content) {
      return Response.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      );
    }

    const entry = addMemory({
      type: type || 'note',
      content,
      tags: tags || [],
    });

    return Response.json({
      success: true,
      entry: entry,
      message: 'Memory entry created successfully',
    });
  } catch (error) {
    console.error('Create memory error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
