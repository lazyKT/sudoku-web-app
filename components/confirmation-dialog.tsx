'use cleint'

import { useRouter } from 'next/router';
import React from 'react';

export interface UnsavedChangesDialogProps {
  shouldConfirmLeave: boolean;
}

export const UnsavedChangesDialog = ({
  shouldConfirmLeave,
}: UnsavedChangesDialogProps): React.ReactElement<UnsavedChangesDialogProps> => {
  const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] = React.useState(false);
  const [nextRouterPath, setNextRouterPath] = React.useState<string>();

  const Router = useRouter();

  const onRouteChangeStart = React.useCallback(
    (nextPath: string) => {
      if (!shouldConfirmLeave) {
        return;
      }

      setShouldShowLeaveConfirmDialog(true);
      setNextRouterPath(nextPath);

      throw 'cancelRouteChange';
    },
    [shouldConfirmLeave]
  );

  const onRejectRouteChange = () => {
    setNextRouterPath(undefined);
    setShouldShowLeaveConfirmDialog(false);
  };

  const onConfirmRouteChange = () => {
    setShouldShowLeaveConfirmDialog(false);
    // simply remove the listener here so that it doesn't get triggered when we push the new route.
    // This assumes that the component will be removed anyway as the route changes
    removeListener();
    if (nextRouterPath) {
      Router.push(nextRouterPath);
    }
  };

  const removeListener = () => {
    Router.events.off('routeChangeStart', onRouteChangeStart);
  };

  React.useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart);

    return removeListener;
  }, [onRouteChangeStart]);

  return (
    <div>Confirmation</div>
  );
};

