<?php

namespace App\Http\Controllers;

use App\Models\Channels;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChannelsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $channels = Channels::all();

        if (!$channels) {
            return response()->json(['error' => 'Channels not found'], 404);
        }

        return response()->json($channels);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'clientsCount' => 'required',
        ]);

        if (Channels::where('name', $request->name)->exists()) {
            return response()->json(['error' => 'Channel already exists'], 400);
        }

        $newChannel = new Channels();
        $newChannel->name = $request->name;
        $newChannel->clientsCount = $request->clientsCount;
        $newChannel->save();
        
        return response()->json($newChannel);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Channels $channel)
    {

        // new name or users_count required
        if(!$request->name) {
            return response()->json(['error' => 'name required'], 400);
        }

        if(!$request->clientsCount) {
            return response()->json(['error' => 'clientsCount required'], 400);
        }

        // check if the channel exists
        if (!$channel) {
            return response()->json(['error' => 'Channel not found'], 404);
        }

        $channel->name = $request->name;
        $channel->clientsCount = $request->clientsCount;
        $channel->save();
        
        return response()->json($channel);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Channels $channel)
    {

        if (!$channel) {
            return response()->json(['error' => 'Channel not found'], 404);
        }

        $channel->delete();
        return response()->json($channel);
    }
}
