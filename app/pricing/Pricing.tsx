'use client';

import Button from '@/components/ui/Button';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  Card, 
  Stack, 
  Typography, 
  List, 
  ListItem, 
  ListItemContent, 
  ListItemDecorator 
} from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];

interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({session, user, products, subscription }: Props) {

  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );

  const router = useRouter();

  const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push('/signin');
    }
    if (subscription) {
      return router.push('/account');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  if (!products.length)
    return (
      <section className="bg-sky-800">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
        {/* <LogoCloud /> */}
      </section>
    );

  return (
    <section className="bg-sky-800">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Generate one cover letter free, then choose a plan to go cotinue gecovering. Account
            plans unlock additional features.
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          <div className="rounded-lg shadow-sm divide-y divide-white bg-white p-6">
              <h2 className="text-2xl font-semibold leading-6 text-black">
                Free Plan
              </h2>
              <p className="mt-8">
                <span className="text-5xl font-extrabold text-black">
                  $0
                </span>
              </p>
              <p className="mt-4 text-black">
                <List>
                  <ListItem>
                    <ListItemContent>3 cover letters per week</ListItemContent>
                    <ListItemDecorator><CheckIcon className="text-green-500"/></ListItemDecorator>
                  </ListItem>
                  <ListItem>
                    <ListItemContent> Use supported job URLs </ListItemContent>
                    <ListItemDecorator><CheckIcon className="text-green-500"/></ListItemDecorator>
                  </ListItem>
                  <ListItem>
                    <ListItemContent> Access to the newest features </ListItemContent>
                    <ListItemDecorator><CloseIcon className="text-red-500"/></ListItemDecorator>
                  </ListItem>
                  <ListItem>
                    <ListItemContent> Custom writing styles </ListItemContent>
                    <ListItemDecorator><CloseIcon className="text-red-500"/></ListItemDecorator>
                  </ListItem>
                </List>
              </p>
              <button
                //disabled={!session}
                // loading={priceIdLoading === price.id}
                // onClick={() => handleCheckout(price)}
                className="bg-pink-500 block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-pink-600"
              >
                {subscription ? 'Manage' : 'Subscribe'}
              </button>
            </div>
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div
                key={product.id}
                className={cn(
                  'rounded-lg shadow-sm divide-y divide-white bg-white',
                  {
                    'border border-pink-500': subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === 'Freelancer'
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-black">
                    {product.name}
                  </h2>
                  {/* <p className="mt-4 text-zinc-300">{product.description}</p> */}
                  <p className="mt-8">
                    <span className="text-5xl font-extrabold text-black">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-black">
                      /{billingInterval}
                    </span>
                  </p>
                  <p className="mt-4 text-black">
                    <List>
                      <ListItem>
                        <ListItemContent>Unlimited cover letters</ListItemContent>
                        <ListItemDecorator><CheckIcon className="text-green-500"/></ListItemDecorator>
                      </ListItem>
                      <ListItem>
                        <ListItemContent> Support for any URL </ListItemContent>
                        <ListItemDecorator><CheckIcon className="text-green-500"/></ListItemDecorator>
                      </ListItem>
                      <ListItem>
                        <ListItemContent> Access to the newest features </ListItemContent>
                        <ListItemDecorator><CheckIcon className="text-green-500"/></ListItemDecorator>
                      </ListItem>
                      <ListItem>
                        <ListItemContent> Custom writing styles </ListItemContent>
                        <ListItemDecorator><CheckIcon className="text-green-500"/></ListItemDecorator>
                      </ListItem>
                    </List>
                  </p>
                  <button
                    // variant="slim"
                    // type="button"
                    disabled={!session}
                    loading={priceIdLoading === price.id}
                    onClick={() => handleCheckout(price)}
                    //className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                    className="bg-pink-500 block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-pink-600"
                  >
                    {subscription ? 'Manage' : 'Subscribe'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <LogoCloud />
      </div>
    </section>
  );
}

function LogoCloud() {
  return (
    <div>
      <p className="mt-24 text-xs uppercase text-zinc-400 text-center font-bold tracking-[0.3em]">
        Built with
      </p>
      <div className="flex flex-col items-center my-12 space-y-4 sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-6 sm:grid-cols-5">
        <div className="flex items-center justify-start">
          <a href="https://nextjs.org" aria-label="Next.js Link">
            <img
              src="/nextjs.svg"
              alt="Next.js Logo"
              className="h-12 text-white"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <img
              src="/vercel.svg"
              alt="Vercel.com Logo"
              className="h-6 text-white"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://stripe.com" aria-label="stripe.com Link">
            <img
              src="/stripe.svg"
              alt="stripe.com Logo"
              className="h-12 text-white"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://supabase.io" aria-label="supabase.io Link">
            <img
              src="/supabase.svg"
              alt="supabase.io Logo"
              className="h-10 text-white"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://github.com" aria-label="github.com Link">
            <img
              src="/github.svg"
              alt="github.com Logo"
              className="h-8 text-white"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
