import FullScreenLoader from "@/common/FullScreenLoader";
import { fetchRefundPolicy } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function ReturnRefund() {

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [ 'fetchTermsConditions' ],
    queryFn: fetchRefundPolicy,
    retry: 2,
    select: (data) => data.data[0]
  });

  let content;

  if(isLoading){
    content = <FullScreenLoader/>
  }

  if(isSuccess){
    content = (
      <main className="container mx-auto px-4 py-10 max-w-4xl text-neutral-800 leading-7">
        <h1 className="text-3xl font-bold mb-6">{data.page_title}</h1>

        <div dangerouslySetInnerHTML={{ __html: data.page_content }} className="space-y-4"></div>
      </main>
    )
  }

  return content;
  // return (
  //   <main className="container mx-auto px-4 py-10 max-w-4xl text-neutral-800 leading-7">
  //     <h1 className="text-3xl font-bold mb-6">Return &amp; Refunds</h1>

  //     <p className="mb-4">
  //       Thank you for ordering at Naturalla.store. We request our valuable customers to take a video of unpacking order when received for quicker resolution and to provide refunds.
  //     </p>

  //     <h2 className="text-2xl font-semibold mb-2">Pre Ship Refunds</h2>
  //     <ul className="list-disc list-inside mb-4 space-y-2">
  //       <li>Refund will be issued when the customer cancels the order before shipping.</li>
  //       <li>Refund will be issued for unprocessed order.</li>
  //     </ul>

  //     <h2 className="text-2xl font-semibold mb-2">Non-Refundable Items</h2>
  //     <ul className="list-disc list-inside mb-4 space-y-2">
  //       <li>
  //         We do not accept returns or provide refunds for opened or used products, unless the item was defective or damaged during shipping.
  //       </li>
  //     </ul>

  //     <h2 className="text-2xl font-semibold mb-2">Post Ship Refunds</h2>
  //     <ul className="list-disc list-inside mb-4 space-y-2">
  //       <li>
  //         Once orders have been shipped, they cannot be cancelled. If you don't wish to accept the parcel, you can simply refuse to accept the parcel at the time of delivery.
  //       </li>
  //       <li>
  //         Once the parcel comes back to the store, we will deduct shipping and return charges from the customer order value before processing the refund.
  //       </li>
  //     </ul>

  //     <h2 className="text-2xl font-semibold mb-2">Damages / Mis-Shipments</h2>
  //     <ul className="list-disc list-inside mb-4 space-y-2">
  //       <li>
  //         If the product delivered is different than what was ordered or is damaged, customer may request for a refund within 2 working days by providing unboxing video of received package to our customer support at <a href="mailto:cs@nllpl.in" className="text-blue-600 underline">cs@nllpl.in</a> or via WhatsApp +91 9655233533.
  //       </li>
  //       <li>Our customer support team will validate the video, and communicate the status within 1–2 working days.</li>
  //       <li>Once eligible, refund will be initiated and processed. Customer can also request for replacement of products post validation. Replacement will be provided free of charges.</li>
  //       <li>If unboxing video is not provided, refund will not be issued.</li>
  //       <li>
  //         All refunds once initiated will be processed to the original source payment method within 7–10 working days. In case you have not received the refund within stipulated time, kindly contact your bank.
  //       </li>
  //     </ul>

  //     <p className="mt-6">
  //       For assistance, contact <a href="mailto:cs@nllpl.in" className="text-blue-600 underline">cs@nllpl.in</a> or WhatsApp us on +91 9655233533. We are happy to help!
  //     </p>
  //   </main>
  // );
}
