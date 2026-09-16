"use client";

import { LoadingState } from "@/components/loading-state";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PricingCard } from "../components/pricing-card";
import { ErrorState } from "@/components/error-state";

export const UpgradeView = () => {
  const trpc = useTRPC();

  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubscription.queryOptions(),
  );

  const { data: products } = useSuspenseQuery(
    trpc.premium.getProducts.queryOptions(),
  );

  return (
    <div className="flex-1 flex flex-col gap-y-10 items-center px-4 py-4 md:px-8">
      <div className="mt-4 flex-1 flex flex-col gap-y-10 items-center">
        <h5 className="text-2xl md:text-3xl font-medium">
          You are on the{" "}
          <span className="font-semibold text-primary">
            {currentSubscription?.name ?? "Free"}{" "}
          </span>
          Plan
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => {
            const isCurrentProduct = currentSubscription?.id === product.id;
            const isPremium = !!currentSubscription;

            let buttonText = "Upgrade";
            let onClick = () => authClient.checkout({ products: [product.id] });

            if (isCurrentProduct) {
              buttonText = "Manage";
              onClick = () => authClient.customer.portal();
            } else if (isPremium) {
              buttonText = "Change Plan";
              onClick = () => authClient.customer.portal();
            }

            return (
              <PricingCard
                key={product.id}
                title={product.name}
                description={product.description}
                buttonText={buttonText}
                price={
                  product.prices[0].amountType === "fixed"
                    ? product.prices[0].priceAmount / 100
                    : 0
                }
                priceSuffix={`/${product.recurringInterval}`}
                variant={
                  product.metadata.variant === "highlighted"
                    ? "highlighted"
                    : "default"
                }
                onClick={onClick}
                badge={product.metadata.badge as string | null}
                features={product.benefits.map(
                  (benefit) => benefit.description,
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const UpgradeViewLoading = () => {
  return (
    <LoadingState title="Loading..." description="This may take a while" />
  );
};

export const UpgradeViewError = () => {
  return <ErrorState title="Error" description="Something went wrong" />;
};
