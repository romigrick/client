import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/hooks/use-auth';
import OrderService from '../../services/orderService';
import type { IOrder } from '../../commons/types';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

const OrdersPage = () => {
  const { authenticatedUser } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await OrderService.getUserOrders();
        if (response.success && response.data) {
          setOrders(response.data as IOrder[]);
        } else {
          setError(response.message || 'Erro ao carregar pedidos');
        }
      } catch (err) {
        setError('Erro ao carregar pedidos');
        console.error('Erro ao buscar pedidos:', err);
      } finally {
        setLoading(false);
      }
    };

    if (authenticatedUser) {
      fetchOrders();
    }
  }, [authenticatedUser]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'info';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Processando';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
  };

  const breadcrumbStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '1rem'
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-content-center align-items-center min-h-screen">
          <div className="text-center">
            <i className="pi pi-spin pi-spinner text-4xl text-primary mb-3"></i>
            <p>Carregando pedidos...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex justify-content-center align-items-center min-h-screen">
          <div className="text-center">
            <i className="pi pi-exclamation-triangle text-4xl text-red-500 mb-3"></i>
            <p className="text-red-500">{error}</p>
            <Button
              label="Tentar novamente"
              icon="pi pi-refresh"
              onClick={() => window.location.reload()}
              className="mt-3"
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={containerStyle}>
        {/* Breadcrumbs */}
        <div style={breadcrumbStyle}>
          Você está em: <a href="/" style={{ color: '#ff6600', textDecoration: 'none' }}>Home</a> / <a href="/account" style={{ color: '#ff6600', textDecoration: 'none' }}>Minha Conta</a> / Meus Pedidos
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Pedidos</h1>
            <p className="text-gray-600">Acompanhe o status dos seus pedidos</p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <i className="pi pi-shopping-bag text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum pedido encontrado</h3>
              <p className="text-gray-600 mb-4">Você ainda não fez nenhum pedido.</p>
              <Button
                label="Continuar comprando"
                icon="pi pi-arrow-left"
                onClick={() => window.history.back()}
                className="p-button-outlined"
              />
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order, index) => (
                <Card key={order.id || index} className="shadow-sm">
                  <div className="flex flex-column lg:flex-row lg:justify-content-between lg:align-items-center gap-4">
                    <div className="flex-1">
                      <div className="flex align-items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 m-0">
                          Pedido #{order.id}
                        </h3>
                        <Badge
                          value={getStatusLabel(order.status || 'pending')}
                          severity={getStatusColor(order.status || 'pending') as any}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Data do pedido:</span>
                          <p>{formatDate(order.createdAt || new Date().toISOString())}</p>
                        </div>
                        <div>
                          <span className="font-medium">Total:</span>
                          <p className="text-lg font-semibold text-green-600">
                            R$ {order.total?.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Itens:</span>
                          <p>{order.items?.length || 0} produto(s)</p>
                        </div>
                      </div>

                      {order.items && order.items.length > 0 && (
                        <div className="mt-4">
                          <Divider />
                          <div className="grid gap-2">
                            {order.items.slice(0, 3).map((item, itemIndex) => (
                              <div key={itemIndex} className="flex align-items-center gap-3">
                                <img
                                  src={(item.product as any).urlImagem || '/placeholder-image.png'}
                                  alt={(item.product as any).name || 'Produto'}
                                  className="w-8 h-8 object-cover border-round"
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 m-0">{(item.product as any).name || 'Produto'}</p>
                                  <p className="text-sm text-gray-600 m-0">
                                    Quantidade: {item.quantity} | R$ {((item.product as any).price || 0).toFixed(2).replace('.', ',')}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <p className="text-sm text-gray-500">
                                +{order.items.length - 3} item(s) adicional(is)
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-column gap-2">
                      <Button
                        label="Ver detalhes"
                        icon="pi pi-eye"
                        className="p-button-outlined p-button-sm"
                        onClick={() => {
                          // TODO: Navigate to order details page
                          console.log('Ver detalhes do pedido:', order.id);
                        }}
                      />
                      {order.status === 'delivered' && (
                        <Button
                          label="Avaliar produtos"
                          icon="pi pi-star"
                          className="p-button-secondary p-button-sm"
                          onClick={() => {
                            // TODO: Navigate to review page
                            console.log('Avaliar produtos do pedido:', order.id);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
