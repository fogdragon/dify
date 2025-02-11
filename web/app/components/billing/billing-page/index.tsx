'use client'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PlanComp from '../plan'
import { ReceiptList } from '../../base/icons/src/vender/line/financeAndECommerce'
import { LinkExternal01 } from '../../base/icons/src/vender/line/general'
import { fetchBillingUrl } from '@/service/billing'
import { useAppContext } from '@/context/app-context'
import { useProviderContext } from '@/context/provider-context'

const Billing: FC = () => {
  const { t } = useTranslation()
  const { isCurrentWorkspaceManager } = useAppContext()
  const [billingUrl, setBillingUrl] = React.useState('')
  const { enableBilling } = useProviderContext()

  useEffect(() => {
    if (!enableBilling && !isCurrentWorkspaceManager)
      return
    (async () => {
      const { url } = await fetchBillingUrl()
      setBillingUrl(url)
    })()
  }, [isCurrentWorkspaceManager])

  return (
    <div>
      <PlanComp />
      {enableBilling && isCurrentWorkspaceManager && billingUrl && (
        <a className='mt-5 flex px-6 justify-between h-12 items-center bg-gray-50 rounded-xl cursor-pointer' href={billingUrl} target='_blank'>
          <div className='flex items-center'>
            <ReceiptList className='w-4 h-4 text-gray-700' />
            <div className='ml-2 text-sm font-normal text-gray-700'>{t('billing.viewBilling')}</div>
          </div>
          <LinkExternal01 className='w-3 h-3' />
        </a>
      )}
    </div>
  )
}
export default React.memo(Billing)
