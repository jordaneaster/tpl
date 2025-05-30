import { supabase } from './supabase';

// Events related functions
export async function getLiveStream() {
  const { data, error } = await supabase
    .from('live_status')
    .select('*, event:events(*)')
    .eq('is_live', true)
    .single();
  
  if (error) console.error('Error fetching live stream:', error);
  return data;
}

export async function getUpcomingEvents(limit = 6) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gt('start_time', new Date().toISOString())
    .order('start_time', { ascending: true })
    .limit(limit);
  
  if (error) console.error('Error fetching upcoming events:', error);
  return data || [];
}

export async function getEventById(id) {
  const { data, error } = await supabase
    .from('events')
    .select('*, artist:artists(*)')
    .eq('id', id)
    .single();
  
  if (error) console.error('Error fetching event:', error);
  return data;
}

// Artists related functions
export async function getFeaturedArtists(limit = 8) {
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('is_featured', true)
    .limit(limit);
  
  if (error) console.error('Error fetching featured artists:', error);
  return data || [];
}

export async function getArtistById(id) {
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) console.error('Error fetching artist:', error);
  return data;
}

export async function getArtistEvents(artistId) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('artist_id', artistId)
    .order('start_time', { ascending: true });
  
  if (error) console.error('Error fetching artist events:', error);
  return data || [];
}
