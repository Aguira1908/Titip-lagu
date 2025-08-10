<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use App\Models\Message; 

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->input('per_page', 10);

        // build query terlebih dahulu (belum paginate/get)
        $query = Message::query()
            ->where('is_active', true);

        // jika ada query param 'nama', lakukan filter (partial match)
        if ($request->filled('nama')) {
            $name = trim($request->get('nama'));
            // partial match; ubah ke '=' jika ingin exact match
            $query->where('nama', 'like', "%{$name}%");
        }

        // ordering
        $query->orderBy('created_at', 'desc');

        // paginasi & pertahankan query params pada link
        $messages = $query->paginate($perPage)->appends($request->only(['nama', 'per_page']));

        return response()->json($messages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'pesan' => 'required|string',
            'lagu' => 'required|array',
            'lagu.track_id' => 'required|string',
            'lagu.title' => 'required|string',
            'lagu.artist' => 'nullable|string',
            'lagu.image' => 'nullable|string',

            'is_active' => 'boolean'
        ]);

        $message = Message::create($validated);

        return response()->json([
            'message' => 'Data berhasil disimpan.',
            'data' => $message
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $message = Message::where('id', $id)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json($message);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
