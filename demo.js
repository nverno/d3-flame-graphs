(function() {
  var convert, runnableVals;

  window.debugging = true;

  runnableVals = [];

  convert = function(rawData, valueFunc) {
    var child, j, len, node, ref, subTree;
    node = {
      name: rawData.n,
      value: valueFunc(rawData),
      children: []
    };
    if (!rawData.a) {
      return node;
    }
    ref = rawData.a;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      subTree = convert(child, valueFunc);
      if (subTree) {
        node.children.push(subTree);
      }
    }
    return node;
  };

  d3.json("data/profile.json", function(err, data) {
    var allStates, flameGraph, profile, tooltip, unhide;
    allStates = function(node) {
      var j, len, ref, state, value;
      value = 0;
      ref = ['RUNNABLE', 'BLOCKED', 'TIMED_WAITING', 'WAITING'];
      for (j = 0, len = ref.length; j < len; j++) {
        state = ref[j];
        if (!isNaN(node.c[state])) {
          value += node.c[state];
        }
      }
      return value;
    };
    profile = convert(data.profile, allStates);
    tooltip = function(d) {
      return d.name + " <br /><br /> " + d.value + " samples<br /> " + (((d.value / profile.value) * 100).toFixed(2)) + "% of total";
    };
    flameGraph = d3.flameGraph('#d3-flame-graph', profile).size([1200, 600]).cellHeight(20).zoomEnabled(true).tooltip(tooltip).render();
    d3.select('#highlight').on('click', function() {
      var nodes;
      nodes = flameGraph.select(function(d) {
        return /java\.util.*/.test(d.name);
      });
      return nodes.classed("highlight", function(d, i) {
        return !d3.select(this).classed("highlight");
      });
    });
    d3.select('#zoom').on('click', function() {
      var node;
      node = flameGraph.select((function(d) {
        return /CountDownLatch\.await$/.test(d.name);
      }), false)[0];
      return flameGraph.zoom(node);
    });
    unhide = false;
    d3.select('#hide').on('click', function() {
      flameGraph.hide((function(d) {
        return /Unsafe\.park$/.test(d.name) || /Object\.wait$/.test(d.name);
      }), unhide);
      return unhide = !unhide;
    });
    return d3.select('#runnable').on('click', function() {
      profile = convert(data.profile, (function(node) {
        if (node.c['RUNNABLE']) {
          return node.c['RUNNABLE'];
        } else {
          return 0;
        }
      }));
      return flameGraph = d3.flameGraph('#d3-flame-graph', profile).size([1200, 600]).cellHeight(20).zoomEnabled(true).tooltip(tooltip).render();
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,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LENBQUMsRUFESCxDQUNNLE9BRE4sRUFDZSxTQUFBO01BQ1gsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsQ0FBQyxTQUFDLENBQUQ7ZUFBTyxlQUFlLENBQUMsSUFBaEIsQ0FBcUIsQ0FBQyxDQUFDLElBQXZCLENBQUEsSUFBZ0MsZUFBZSxDQUFDLElBQWhCLENBQXFCLENBQUMsQ0FBQyxJQUF2QjtNQUF2QyxDQUFELENBQWhCLEVBQXVGLE1BQXZGO2FBQ0EsTUFBQSxHQUFTLENBQUM7SUFGQyxDQURmO1dBS0EsRUFBRSxDQUFDLE1BQUgsQ0FBVSxXQUFWLENBQ0UsQ0FBQyxFQURILENBQ00sT0FETixFQUNlLFNBQUE7TUFDWCxPQUFBLEdBQVUsT0FBQSxDQUFRLElBQUksQ0FBQyxPQUFiLEVBQXNCLENBQUMsU0FBQyxJQUFEO1FBQVUsSUFBRyxJQUFJLENBQUMsQ0FBRSxDQUFBLFVBQUEsQ0FBVjtpQkFBMkIsSUFBSSxDQUFDLENBQUUsQ0FBQSxVQUFBLEVBQWxDO1NBQUEsTUFBQTtpQkFBbUQsRUFBbkQ7O01BQVYsQ0FBRCxDQUF0QjthQUNWLFVBQUEsR0FBYSxFQUFFLENBQUMsVUFBSCxDQUFjLGlCQUFkLEVBQWlDLE9BQWpDLENBQ1gsQ0FBQyxJQURVLENBQ0wsQ0FBQyxJQUFELEVBQU8sR0FBUCxDQURLLENBRVgsQ0FBQyxVQUZVLENBRUMsRUFGRCxDQUdYLENBQUMsV0FIVSxDQUdFLElBSEYsQ0FJWCxDQUFDLE9BSlUsQ0FJRixPQUpFLENBS1gsQ0FBQyxNQUxVLENBQUE7SUFGRixDQURmO0VBcEMyQixDQUE3QjtBQXRCQSIsImZpbGUiOiJkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIyBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIGZyb20gYSBwYXJ0aWN1bGFyIGRhdGEgZm9ybWF0IGludG8gdGhlIGdlbmVyaWMgb25lXG4jIGV4cGVjdGVkIGJ5IHRoZSBwbHVnaW5cbndpbmRvdy5kZWJ1Z2dpbmcgPSB0cnVlXG5cbnJ1bm5hYmxlVmFscyA9IFtdXG5jb252ZXJ0ID0gKHJhd0RhdGEsIHZhbHVlRnVuYykgLT5cblxuICAjIHRpbWVFbGFwc2VkID0gbmV3IERhdGUoKVxuICAjIHRpbWVFbGFwc2VkLnNldFNlY29uZHModmFsdWUpXG4gICMgdGltZUZvcm1hdCA9IGNvdW50ZG93bi5EQVlTIHwgY291bnRkb3duLkhPVVJTIHwgY291bnRkb3duLk1JTlVURVMgfCBjb3VudGRvd24uU0VDT05EU1xuICBub2RlID1cbiAgICBuYW1lOiByYXdEYXRhLm4sXG4gICAgdmFsdWU6IHZhbHVlRnVuYyhyYXdEYXRhKSxcbiAgICAjIHRpbWU6IGNvdW50ZG93bihuZXcgRGF0ZSgpLCB0aW1lRWxhcHNlZCwgdGltZUZvcm1hdClcbiAgICBjaGlsZHJlbjogW11cblxuICAjIHRoZSBhIGZpZWxkIGlzIHRoZSBsaXN0IG9mIGNoaWxkcmVuXG4gIHJldHVybiBub2RlIGlmIG5vdCByYXdEYXRhLmFcbiAgZm9yIGNoaWxkIGluIHJhd0RhdGEuYVxuICAgIHN1YlRyZWUgPSBjb252ZXJ0KGNoaWxkLCB2YWx1ZUZ1bmMpXG4gICAgaWYgc3ViVHJlZVxuICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKHN1YlRyZWUpXG4gIG5vZGVcblxuZDMuanNvbiBcImRhdGEvcHJvZmlsZS5qc29uXCIsIChlcnIsIGRhdGEpIC0+XG4gIGFsbFN0YXRlcyA9IChub2RlKSAtPlxuICAgIHZhbHVlID0gMFxuICAgIGZvciBzdGF0ZSBpbiBbJ1JVTk5BQkxFJywgJ0JMT0NLRUQnLCAnVElNRURfV0FJVElORycsICdXQUlUSU5HJ11cbiAgICAgIHZhbHVlICs9IG5vZGUuY1tzdGF0ZV0gaWYgbm90IGlzTmFOKG5vZGUuY1tzdGF0ZV0pXG4gICAgdmFsdWVcblxuXG4gIHByb2ZpbGUgPSBjb252ZXJ0KGRhdGEucHJvZmlsZSwgYWxsU3RhdGVzKVxuICB0b29sdGlwID0gKGQpIC0+IFwiI3tkLm5hbWV9IDxiciAvPjxiciAvPlxuICAgICN7ZC52YWx1ZX0gc2FtcGxlczxiciAvPlxuICAgICN7KChkLnZhbHVlIC8gcHJvZmlsZS52YWx1ZSkgKiAxMDApLnRvRml4ZWQoMil9JSBvZiB0b3RhbFwiXG4gIGZsYW1lR3JhcGggPSBkMy5mbGFtZUdyYXBoKCcjZDMtZmxhbWUtZ3JhcGgnLCBwcm9maWxlKVxuICAgIC5zaXplKFsxMjAwLCA2MDBdKVxuICAgIC5jZWxsSGVpZ2h0KDIwKVxuICAgIC56b29tRW5hYmxlZCh0cnVlKVxuICAgIC50b29sdGlwKHRvb2x0aXApXG4gICAgLnJlbmRlcigpXG5cbiAgZDMuc2VsZWN0KCcjaGlnaGxpZ2h0JylcbiAgICAub24gJ2NsaWNrJywgKCkgLT5cbiAgICAgIG5vZGVzID0gZmxhbWVHcmFwaC5zZWxlY3QoKGQpIC0+IC9qYXZhXFwudXRpbC4qLy50ZXN0KGQubmFtZSkpXG4gICAgICBub2Rlcy5jbGFzc2VkKFwiaGlnaGxpZ2h0XCIsIChkLCBpKSAtPiBub3QgZDMuc2VsZWN0KEApLmNsYXNzZWQoXCJoaWdobGlnaHRcIikpXG5cbiAgZDMuc2VsZWN0KCcjem9vbScpXG4gICAgLm9uICdjbGljaycsICgpIC0+XG4gICAgICAjIGp1bXAgdG8gdGhlIGZpcnN0IGphdmEudXRpbC5jb25jdXJyZW50IG1ldGhvZCB3ZSBjYW4gZmluZFxuICAgICAgbm9kZSA9IGZsYW1lR3JhcGguc2VsZWN0KCgoZCkgLT4gL0NvdW50RG93bkxhdGNoXFwuYXdhaXQkLy50ZXN0KGQubmFtZSkpLCBmYWxzZSlbMF1cbiAgICAgIGZsYW1lR3JhcGguem9vbShub2RlKVxuXG4gIHVuaGlkZSA9IGZhbHNlXG4gIGQzLnNlbGVjdCgnI2hpZGUnKVxuICAgIC5vbiAnY2xpY2snLCAoKSAtPlxuICAgICAgZmxhbWVHcmFwaC5oaWRlICgoZCkgLT4gL1Vuc2FmZVxcLnBhcmskLy50ZXN0KGQubmFtZSkgb3IgL09iamVjdFxcLndhaXQkLy50ZXN0KGQubmFtZSkpLCB1bmhpZGVcbiAgICAgIHVuaGlkZSA9ICF1bmhpZGVcblxuICBkMy5zZWxlY3QoJyNydW5uYWJsZScpXG4gICAgLm9uICdjbGljaycsICgpIC0+XG4gICAgICBwcm9maWxlID0gY29udmVydChkYXRhLnByb2ZpbGUsICgobm9kZSkgLT4gaWYgbm9kZS5jWydSVU5OQUJMRSddIHRoZW4gbm9kZS5jWydSVU5OQUJMRSddIGVsc2UgMCkpXG4gICAgICBmbGFtZUdyYXBoID0gZDMuZmxhbWVHcmFwaCgnI2QzLWZsYW1lLWdyYXBoJywgcHJvZmlsZSlcbiAgICAgICAgLnNpemUoWzEyMDAsIDYwMF0pXG4gICAgICAgIC5jZWxsSGVpZ2h0KDIwKVxuICAgICAgICAuem9vbUVuYWJsZWQodHJ1ZSlcbiAgICAgICAgLnRvb2x0aXAodG9vbHRpcClcbiAgICAgICAgLnJlbmRlcigpIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
