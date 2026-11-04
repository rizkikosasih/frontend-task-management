import { http, HttpResponse } from 'msw'

let mockTasks = [
  {
    id: 101,
    project_id: 1,
    title: 'Tugas Pertama',
    description: 'Deskripsi tugas pertama',
    status: 'todo',
    created_at: '2026-11-01',
  },
]

export function resetMockTasks() {
  mockTasks = [
    {
      id: 101,
      project_id: 1,
      title: 'Tugas Pertama',
      description: 'Deskripsi tugas pertama',
      status: 'todo',
      created_at: '2026-11-01',
    },
  ]
}

export const handlers = [
  http.options('*', () => {
    return new HttpResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Idempotency-Key',
      },
    })
  }),

  http.get('*/api/projects', () => {
    return HttpResponse.json({
      data: [
        {
          id: 1,
          name: 'Proyek Alpha',
          description: 'Deskripsi proyek alpha',
          created_at: '2026-11-01',
          tasks_count: 3,
        },
      ],
      meta: { total: 1, current_page: 1, per_page: 15, last_page: 1 },
    })
  }),

  http.get('*/api/tasks', () => {
    return HttpResponse.json({
      data: mockTasks,
      meta: { total: mockTasks.length, current_page: 1, per_page: 15, last_page: 1 },
    })
  }),

  http.patch('*/api/tasks/:id/status', async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as { status: string }

    if (id === '999') {
      return HttpResponse.json(
        { message: 'Konflik konkurensi: status tugas telah diubah oleh pengguna lain.' },
        { status: 409 }
      )
    }

    const task = mockTasks.find((t) => t.id === Number(id))
    if (task) {
      task.status = body.status
    }

    return HttpResponse.json({
      data: {
        id: Number(id),
        project_id: 1,
        title: 'Tugas Terupdate',
        status: body.status,
      },
    })
  }),
]
