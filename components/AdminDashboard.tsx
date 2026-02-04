import React, { useState, useEffect } from 'react';
import { AffiliateManager } from '../utils/affiliateManager';
import { AffiliateLink } from '../types';
import { Button } from './Button';
import { SEO } from './SEO';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  BarChart3, 
  Eye, 
  EyeOff,
  Copy,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MousePointer
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState<AffiliateLink | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    destinationUrl: '',
    productImage: '',
    category: '',
    price: '',
    originalPrice: '',
    discount: '',
    tags: '',
    trustBadges: '',
    isActive: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const links = AffiliateManager.getAffiliateLinks();
    const statistics = AffiliateManager.getStatsSummary();
    setAffiliateLinks(links);
    setStats(statistics);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const linkData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      trustBadges: formData.trustBadges.split(',').map(badge => badge.trim()).filter(Boolean)
    };

    if (editingLink) {
      AffiliateManager.updateAffiliateLink(editingLink.id, linkData);
    } else {
      AffiliateManager.addAffiliateLink(linkData);
    }

    resetForm();
    loadData();
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      description: '',
      destinationUrl: '',
      productImage: '',
      category: '',
      price: '',
      originalPrice: '',
      discount: '',
      tags: '',
      trustBadges: '',
      isActive: true
    });
    setShowAddForm(false);
    setEditingLink(null);
  };

  const handleEdit = (link: AffiliateLink) => {
    setFormData({
      slug: link.slug,
      title: link.title,
      description: link.description,
      destinationUrl: link.destinationUrl,
      productImage: link.productImage || '',
      category: link.category,
      price: link.price || '',
      originalPrice: link.originalPrice || '',
      discount: link.discount || '',
      tags: link.tags.join(', '),
      trustBadges: link.trustBadges?.join(', ') || '',
      isActive: link.isActive
    });
    setEditingLink(link);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this affiliate link?')) {
      AffiliateManager.deleteAffiliateLink(id);
      loadData();
    }
  };

  const toggleActive = (id: string, currentStatus: boolean) => {
    AffiliateManager.updateAffiliateLink(id, { isActive: !currentStatus });
    loadData();
  };

  const copyToClipboard = (slug: string) => {
    const url = `https://drozhealthfacts.com/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO
        title="Affiliate Dashboard - Dr. Oz Health Facts"
        description="Manage affiliate links and track performance"
        canonicalUrl="https://drozhealthfacts.com/admin"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Affiliate Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your affiliate links and track performance
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Links</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalLinks}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Active Links</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeLinks}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <MousePointer className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Clicks</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalClicks}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Last 30 Days</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.clicksLast30Days}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Link Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Affiliate Link
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingLink ? 'Edit Affiliate Link' : 'Add New Affiliate Link'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="formula99"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Weight Loss"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Product Title"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Product description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Destination URL (Affiliate Link)
                </label>
                <input
                  type="url"
                  name="destinationUrl"
                  value={formData.destinationUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.digistore24.com/redir/472943/waners/"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  name="productImage"
                  value={formData.productImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="$49.99"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Original Price
                  </label>
                  <input
                    type="text"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="$79.99"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Discount
                  </label>
                  <input
                    type="text"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="37% OFF"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="weight-loss, supplement, natural"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Trust Badges (comma separated)
                </label>
                <input
                  type="text"
                  name="trustBadges"
                  value={formData.trustBadges}
                  onChange={handleInputChange}
                  placeholder="FDA Approved, Doctor Recommended, 30-Day Guarantee"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Active
                </label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit">
                  {editingLink ? 'Update Link' : 'Add Link'}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Links Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Affiliate Links ({affiliateLinks.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {affiliateLinks.map((link) => (
                  <tr key={link.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={link.productImage || 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=100&h=100&fit=crop'}
                          alt={link.title}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {link.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {link.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          /{link.slug}
                        </code>
                        <button
                          onClick={() => copyToClipboard(link.slug)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {copiedSlug === link.slug ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {link.clickCount}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(link.id, link.isActive)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          link.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {link.isActive ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(`https://drozhealthfacts.com/${link.slug}`, '_blank')}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(link)}
                          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {affiliateLinks.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No affiliate links found. Add your first link to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};