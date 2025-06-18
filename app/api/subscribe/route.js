import { ConnectDB } from "@/lib/config/db";
import SubscribeModel from "@/lib/models/SubscribeModel";
import { NextResponse } from "next/server";



const LoadDB = async () =>{
   await ConnectDB();
}

LoadDB();

// GET: Fetch all or filtered subscriptions
export async function GET(req) {
  try {
    

    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('blogId');
    const subscriberEmail = searchParams.get('subscriberEmail');

    const filter = {};
    if (blogId) filter.blogId = blogId;
    if (subscriberEmail) filter.subscriberEmail = subscriberEmail;

    const subscriptions = await SubscribeModel.find(filter).sort({ subscribedAt: -1 });

    return NextResponse.json(subscriptions, { status: 200 });
  } catch (err) {
    console.error('GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}

//  POST: Create a new subscription
export async function POST(req) {
  try {

    const {
      blogId,
      blogTitle,
      blogAuthorEmail,
      blogAuthorImg,
      subscriberEmail,
      subscriberImg,
    } = await req.json();

    const newSubscription = await SubscribeModel.create({
      blogId,
      blogTitle,
      blogAuthorEmail,
      blogAuthorImg,
      subscriberEmail,
      subscriberImg,
    });

    return NextResponse.json({ message: 'Subscription saved', data: newSubscription }, { status: 201 });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}

// DELETE: Delete a subscription by ID
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const deleted = await SubscribeModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}