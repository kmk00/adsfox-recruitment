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
        return response()->json(Channels::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'users_count' => 'required',
        ]);

        // take the data from body and create a new channel

        $newChannel = new Channels();
        $newChannel->name = $request->name;
        $newChannel->users_count = $request->users_count;
        $newChannel->save();
        
        return response()->json($newChannel);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Channels $channel)
    {

        // new name or users_count required
        if(!$request->name && !$request->users_count) {
            return response()->json(['error' => 'name or users_count required'], 400);
        }

        // check if the channel exists
        if (!$channel) {
            return response()->json(['error' => 'Channel not found'], 404);
        }

        $channel->name = $request->name;
        $channel->users_count = $request->users_count;
        $channel->save();
        
        return response()->json($channel);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Channels $channel)
    {
        $channel->delete();
        return response()->json($channel);
    }
}
